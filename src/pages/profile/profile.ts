import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OldPostsPage } from '../oldposts/oldposts';
import { SettingsPage } from '../settings/settings';
import { User } from '../../models/user';
import { DBUser } from '../../models/dbuser';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../services/toast.service';

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
   public numthanks: number;

  constructor(private toast: ToastService, private afs: AngularFirestore, private storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    this.updateData();
    
  }
  
  ionViewWillEnter() {
    this.updateData();
  }
  
  updateData() {
    this.storage.get('uid').then((val) => {
      this.uid = val;
      
      let postRef = this.afs.collection('posts').ref.where('uid', '==', this.uid);
      this.numthanks = 0;
      
      postRef.get().then((result) => {
        result.forEach(doc => {
          // this.numthanks$ += doc.data()['numthanks'];
          this.numthanks += doc.data()['numthanks'];
        });
        
        this.toast.show(this.numthanks.toString(), 2000);
      
        var user = {} as DBUser;
        user.numthanks = this.numthanks;
        var userPath = 'users/' + this.uid;
        var userDoc = this.afs.doc<DBUser>(userPath);
        userDoc.update(user);
      });
      
      let userRef = this.afs.collection('users').ref.where('uid', '==', this.uid);
    
      userRef.get().then((result) => {
        result.forEach(doc => {
          this.name$ = doc.data()['name'];
          this.username$ = doc.data()['username'];
          this.numthanks$ = doc.data()['numthanks'];
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
      uid: this.uid, name: this.name$, username: this.username$, email: this.email, numthanks: this.numthanks
    });
  }
}
