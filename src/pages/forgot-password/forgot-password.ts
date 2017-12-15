import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from '../../models/user';


/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  
  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }
  
  
  sendResetEmail(user:User) {

    this.afAuth.auth.sendPasswordResetEmail(user.email).then(function() {
       this.toast.show('An email has been sent.', 3000);
    }).catch(function(error) {
    });
  }

}
