import { Component } from '@angular/core';
import { User } from '../../models/user';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OldPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oldposts',
  templateUrl: 'oldposts.html',
})
export class OldPostsPage {
  
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OldpostsPage');
  }

}
