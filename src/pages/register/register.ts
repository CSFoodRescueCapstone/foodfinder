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
        console.log(result);
      
        if(result) {
          // this.navCtrl.push(LoginPage); // do NOT want to be redirected there
            
          const resultLogin = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
          resultLogin.then(function(user1) {
          //console.log('uid', user1.uid);
          }).catch(function(error) {
          //console.log(error);
          });
            
          this.wait(5000);
          var fbuser = this.afAuth.auth.currentUser;
            
          if (fbuser) {
            console.log('user: ', fbuser.uid);
        
            this.goodLogin(fbuser.uid, user.username, user.name);
          } else {
            this.badLogin();
          } // end else
        } // end if (result)
    }
    else {
       this.toast.show('Passwords do not match', 5000);
    }
  }
  
  goodLogin(uid, username, name) {
    this.storage.set('loggedin', true);
    this.storage.set('uid', uid);
    var photopath = "nophoto";
    var posts = [];
    
    this.af.list("users").push({ uid, name, username, photopath, posts });
    
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
    } // end while
  } // end wait
} // end class
