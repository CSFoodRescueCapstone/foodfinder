import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastService } from '../../services/toast.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  user = {} as User;
  // username: String;

  constructor(private afs: AngularFirestore, private af: AngularFireDatabase, private storage: Storage, private toast: ToastService, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  } // end constructor

  login(user: User) {
      //const resultLogin = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((returnedUser) => {
        //console.log('uid', returnedUser.uid);
        this.goodLogin(returnedUser.uid);
      })
      .catch((err) => {         
        console.log('Error', err);
        this.badLogin();
      })
  }
  
  register() {
    this.navCtrl.push(RegisterPage);
  }
  
  goodLogin(uid) {
    //this.username = this.af.list('/users', ref => ref.equalTo({ value: 'username', 'uid': uid }).valueChanges();
    //var username = this.afs.collection('users', ref => ref.where('uid', '==', uid)).valueChanges();
    //console.log(username);
    //this.getUser(uid);
    
    this.storage.set('loggedin', true);
    this.storage.set('uid', uid);
    this.storage.set('username', 'username');
    
    this.navCtrl.push(TabsPage);
  }
  
  badLogin() {
    this.toast.show('Please try again.', 1000);
  }
  
  // getUser(uid: string){
  //   let user: User;
  //   let userKey = this.afs.collection<User>('users', ref => ref.where('uid', '==', uid)).ref.id;
  //   let user$: Observable<User> = this.afs.collection<User>('users').doc(userKey).valueChanges() as Observable<User>;
  //   let userSub: Subscription = user$.subscribe(data => {
  //     user = data;
  //   })
  //   console.log(user);
  // }

} // end class
