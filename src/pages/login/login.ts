import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { ToastService } from '../../services/toast.service';

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

  constructor(private toast: ToastService, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(user: User) {
    try {
      //const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(function(user1) {
        console.log('uid',user1.uid);
        // goodLogin();
      }).catch(function(error) {
        console.log(error);
        //badLogin();
      });
      
      this.navCtrl.push(TabsPage);
      
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
