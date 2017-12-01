import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
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

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      
      this.toast.create({
          message: result.toString(),
          duration: 5000
        }).present();
      
      if(result) {
        this.navCtrl.push(TabsPage);
      }
      
      else {
        this.toast.create({
          message: 'Account does not exist',
          duration: 5000
        }).present();
      }
      
    }
    catch(e) {
      console.error(e);
    }
  }
  
  register() {
    this.navCtrl.push(RegisterPage);
  }

}
