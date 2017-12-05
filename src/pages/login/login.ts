import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { ToastService } from '../../services/toast.service';
import { Storage } from '@ionic/storage';

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

  constructor(private storage: Storage, private toast: ToastService, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(user: User) {
    try {
      // this.afAuth.auth.signOut().then(function() {
      //   console.log('Signed Out');
      // }, function(error) {
      //   console.error('Sign Out Error', error);
      // });
      
      const resultLogout = this.afAuth.auth.signOut();
      const resultLogin = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      resultLogout.then(function() {
        console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
      
      resultLogin.then(function(user1) {
        console.log('uid', user1.uid);
      }).catch(function(error) {
        console.log(error);
      });
      
      // this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(function(user1) {
      //   console.log('uid', user1.uid);
      // }).catch(function(error) {
      //   console.log(error);
      // });
      
      var fbuser = this.afAuth.auth.currentUser;
      
      if (fbuser) {
        console.log('user: ', fbuser);
        this.goodLogin();
      } else {
        this.badLogin();
      }
      
    }
    catch(e) {
      console.error(e);
    }
  }
  
  register() {
    this.navCtrl.push(RegisterPage);
  }
  
  goodLogin() {
    this.navCtrl.push(TabsPage);
  }
  
  badLogin() {
    this.toast.show('Account does not exist', 5000);
  }


}
