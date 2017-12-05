import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OldPostsPage } from '../pages/oldposts/oldposts';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
   user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    
    changePhoto() { // method for the changePhoto button
      
    }
    
    viewOldPosts() { // method for the viewOldPosts button
      this.navCtrl.push(OldPostsPage);
    }
    
    changePassword() { // method for the changePassword button
      
    }
    
    changeUsername() { // method for the changeUsername button
      
    }
    
    logout() { // method for the logout button
      this.navCtrl.setRoot(LoginPage); // setRoot instead of push so there is no back button
      
    }
    
    deleteAccount() { // method for the deleteAccount button
      
    }

  }

}
