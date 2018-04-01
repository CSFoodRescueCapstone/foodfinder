import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { DBUser } from '../../models/dbuser';
import { ToastService } from '../../services/toast.service';
import { Storage } from '@ionic/storage';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from "angularfire2/auth";
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

  constructor(private afs: AngularFirestore, private storage: Storage, private toast: ToastService, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  } // end constructor
  
  async register(user: User) {
    if(user.confirmpassword == user.password) {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      
        if(result) {
          this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
          .then((returnedUser) => {
            this.goodLogin(returnedUser.uid, user.username, user.name, user.email);
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
  
  goodLogin(uid: string, username: string, name: string, email: string) {
    this.storage.set('loggedin', true);
    this.storage.set('uid', uid);
    this.storage.set('username', username);
    
    const users = this.afs.collection<DBUser>('users');
    
    users.doc(uid).set({ uid: uid,
                         name: name,
                         username: username,
                         email: email,
                         numthanks: 0
    });
    
    this.navCtrl.push(TabsPage);
  }
  
  badLogin() {
    this.toast.show('Please try again.', 1000);
  }
} // end class
