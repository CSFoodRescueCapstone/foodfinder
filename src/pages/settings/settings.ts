import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private storage: Storage, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  
  changePassword() { // method for the changePassword button
    
  }
  
  changeUsername() { // method for the changeUsername button
    
  }
  
  logout() { // method for the logout button
    const resultLogout = this.afAuth.auth.signOut();
    
    resultLogout.then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
    
    this.storage.set('loggedin', false);
    this.storage.set('uid', null);
    this.storage.set('username', null);
    
     this.navCtrl.push(LoginPage);
     window.location.reload();
  }
  
  deleteAccount() { // method for the deleteAccount button
    
  }

}
