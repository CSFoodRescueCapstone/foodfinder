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
  } // end constructor

  login(user: User) {
      //const resultLogin = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((returnedUser) => {
        console.log('uid', returnedUser.uid);
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
    this.storage.set('loggedin', true);
    this.storage.set('uid', uid);
    
    this.navCtrl.push(TabsPage);
  }
  
  badLogin() {
    this.toast.show('Please try again.', 1000);
  }
  
  wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  } // end wait

} // end class
