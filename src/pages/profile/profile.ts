import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OldPostsPage } from '../oldposts/oldposts';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  
   name$: Observable<string>;
   username$: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    this.storage.get('uid').then((val) => {
      var uid = val;
      
      let userRef = this.afs.collection('users').ref.where('uid', '==', uid);
    
      userRef.get().then((result) => {
        result.forEach(doc => {
          this.name$ = doc.data()['name'];
          this.username$ = doc.data()['username'];
        
          
        })
      })
    });
    
  }
  
  changePhoto() { // method for the changePhoto button
    
  }
  
  viewOldPosts() { // method for the viewOldPosts button
    this.navCtrl.push(OldPostsPage);
  }
  
  changePassword() { // method for the changePassword button
    
  }
  
  changeUsername() { // method for the changeUsername button
    
  }
  
  logout() { // method for the logout button
    const resultLogout = this.afAuth.auth.signOut();
    
    resultLogout.then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    
    this.storage.set('loggedin', false);
    this.storage.set('uid', null);
    this.storage.set('username', null);
    
     this.navCtrl.push(LoginPage);
     window.location.reload();
  }
  
  deleteAccount() { // method for the deleteAccount button
    
  }

}
