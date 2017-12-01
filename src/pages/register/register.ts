import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  async register(user: User) {
    if(user.confirmpassword == user.password) {
      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        console.log(result);
      
        if(result) {
          this.navCtrl.push(LoginPage);
        }
      }
      catch(e) {
        console.error(e);
      }
    }
    else {
       this.toast.create({
          message: 'Account does not exist',
          duration: 5000
        }).present();
    }
  }

}
