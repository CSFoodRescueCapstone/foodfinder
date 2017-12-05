import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  constructor(public navCtrl: NavController) {
    this.loadFeed();
  }
  
  loadFeed() {
    // var posts = this.af.ref('posts/');
    // posts.on('value', function(snapshot) {
    //   console.log(snapshot.val());
    // });
  }
}
