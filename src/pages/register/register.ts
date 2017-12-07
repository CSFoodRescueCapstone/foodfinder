import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { ToastService } from '../../services/toast.service';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

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

  constructor(private af: AngularFireDatabase, private storage: Storage, private toast: ToastService, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  } // end constructor
  
  async register(user: User) {
    if(user.confirmpassword == user.password) {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      
        if(result) {
          this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
          .then((returnedUser) => {
            this.goodLogin(returnedUser.uid, user.username, user.name);
          })
          .catch((err) => {         
            console.log('Error', err);
            this.badLogin();
          })
        } // end if (result)
    }
    else {
       this.toast.show('Passwords do not match', 5000);
    }
  }
  
  goodLogin(uid, username, name) {
    this.storage.set('loggedin', true);
    this.storage.set('uid', uid);
    this.storage.set('username', username);
    
    var photopath = "nophoto";
    var posts = [];
    
    this.af.list("users").push({ uid, name, username, photopath, posts });
    
    this.navCtrl.push(TabsPage);
  }
  
  badLogin() {
    this.toast.show('Please try again.', 1000);
  }
} // end class
