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
  
   name$: Observable<string>;
   username$: Observable<string>;
   numthanks$: Observable<number>;
   public uid: string;
   public email: string;

  constructor(private afs: AngularFirestore, private storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    this.name$ = " ";
    this.username$ = " ";
    this.updateData();
    
  }
  
  ionViewWillEnter() {
    this.name$ = " ";
    this.username$ = " ";
    this.updateData();
  }
  
  updateData() {
    this.storage.get('uid').then((val) => {
      this.uid = val;
      
      let postRef = this.afs.collection('posts').ref.where('uid', '==', this.uid);
      var numthanks = 0;
      
      postRef.get().then((result) => {
        result.forEach(doc => {
           numthanks += doc.data()['numthanks'];
        });
      });
      
      let userRef = this.afs.collection('users').ref.where('uid', '==', this.uid);
    
      userRef.get().then((result) => {
        result.forEach(doc => {
          this.name$ = doc.data()['name'];
          this.username$ = doc.data()['username'];
          this.numthanks$ = numthanks;
          this.email = doc.data()['email'];
        });
      });
    });
  }
  
  viewOldPosts() { // method for the viewOldPosts button
    this.navCtrl.push(OldPostsPage);
  }
  
  viewSettings() { // method for the viewOldPosts button
    this.navCtrl.push(SettingsPage, {
      uid: this.uid, name: this.name$, username: this.username$, email: this.email
    });
  }
}
