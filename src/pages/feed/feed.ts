import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
  posts$: Observable<any[]>;

  constructor(private af: AngularFireDatabase, public navCtrl: NavController) {
    //this.posts$ = this.af.list('/posts').valueChanges();
    
    this.posts$ = this.af.list('/posts', ref => ref.orderByChild('time')).valueChanges();
  }
}
