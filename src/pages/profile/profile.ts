import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OldPostsPage } from '../oldposts/oldposts';
import { SettingsPage } from '../settings/settings';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  
   name$: Observable<string> = "";
   username$: Observable<string> = "";

  constructor(private afs: AngularFirestore, private storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    this.storage.get('uid').then((val) => {
      var uid = val;
      
      let userRef = this.afs.collection('users').ref.where('uid', '==', uid);
    
      userRef.get().then((result) => {
        result.forEach(doc => {
          this.name$ = doc.data()['name'];
          this.username$ = doc.data()['username'];
          
          console.log(this.name$);
          console.log(this.username$);
        })
      })
    });
    
  }
  
  changePhoto() { // method for the changePhoto button
    
  }
  
  viewOldPosts() { // method for the viewOldPosts button
    this.navCtrl.push(OldPostsPage);
  }
  
  viewSettings() { // method for the viewOldPosts button
    this.navCtrl.push(SettingsPage);
  }
  
  changePassword() { // method for the changePassword button
    
  }
  
  changeUsername() { // method for the changeUsername button
    
  }

}
