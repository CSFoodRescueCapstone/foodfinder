import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastService } from '../../services/toast.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

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

  constructor(private afs: AngularFirestore, private storage: Storage, private toast: ToastService, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(user: User) {
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
    let userRef = this.afs.collection('users').ref.where('uid', '==', uid);
    var username = "";
    
    userRef.get().then((result) => {
      result.forEach(doc => {
        username = doc.data()['username'];
        
        this.storage.set('loggedin', true);
        this.storage.set('uid', uid);
        this.storage.set('username', username);
    
        this.navCtrl.push(TabsPage);
      })
    })
  }
  
  badLogin() {
    this.toast.show('Please try again.', 1000);
  }
  
  forgotPassword() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
