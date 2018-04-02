import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../../services/toast.service';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
// import { User } from '../../models/user';
import { DBUser } from '../../models/dbuser';
import { Post } from '../../models/post';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  user = {} as DBUser;
  name$: Observable<string>;
  username$: Observable<string>;
  uid: string;
  name: string;
  username: string;
  email: string;
  numthanks: number;

  constructor(private toast: ToastService, private afs: AngularFirestore, private storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  
    this.uid = this.navParams.get('uid');
    this.name$ = this.navParams.get('name');
    this.username$ = this.navParams.get('username');
    this.name = this.navParams.get('name');
    this.username = this.navParams.get('username');
    this.email = this.navParams.get('email');
    this.numthanks = this.navParams.get('numthanks');
  }
  
  editName(user: DBUser) {
    // user.username = this.username;
    // user.uid = this.uid;
    // user.numthanks = this.numthanks;
    // this.name = user.name;
      
    var userPath = 'users/' + this.uid;
    var userDoc = this.afs.doc<DBUser>(userPath);
    userDoc.update(user);
    
    this.toast.show('Name updated.', 2000);
  }
  
  editUsername(user: DBUser) {
    // user.name = this.name;
    // user.uid = this.uid;
    // user.numthanks = this.numthanks;
    // this.username = user.username;
      
    var userPath = 'users/' + this.uid;
    var userDoc = this.afs.doc<DBUser>(userPath);
    userDoc.update(user);
    this.storage.set('username', user.username);
    
    let postRef = this.afs.collection('posts').ref.where('uid', '==', user.uid);
    const posts = this.afs.collection<Post>('posts', ref => ref.where('uid', '==', user.uid));
    
    postRef.get().then((result) => {
      result.forEach(doc => {
        var pid = doc.data()['pid'];
        var uid = doc.data()['uid'];
        var location = doc.data()['location'];
        var info = doc.data()['info'];
        var photopath = doc.data()['photopath'];
        var time = doc.data()['time'];
        var thanks = doc.data()['thanks'];
        var numthanks = doc.data()['numthanks'];
        var gone = doc.data()['gone'];
        var numgone = doc.data()['numgone'];
        
        posts.doc(pid).set({ pid: pid,
                             uid: uid,
                             username: user.username,
                             location: location,
                             info: info,
                             photopath: photopath,
                             time: time,
                             thanks: thanks,
                             numthanks: numthanks,
                             gone: gone,
                             numgone: numgone
        });
      })
    })
    
    this.toast.show('Username updated.', 2000);
  }
  
  sendResetEmail() {

    this.afAuth.auth.sendPasswordResetEmail(this.email).then(function() {
       this.printToast();
    }).catch(function(error) {
    });
    
  }
  
  logout() {
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
  
  deleteAccount() {
  
    //var user = firebase.auth().currentUser;

    //user.delete().then(function() {
     // User deleted.
    //}).catch(function(error) {
     // An error happened.
   //});
    
  }
  
  printToast() {
    this.toast.show('An email has been sent.', 3000);
  }

}
