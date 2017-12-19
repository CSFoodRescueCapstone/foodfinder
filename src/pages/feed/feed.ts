import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Post } from '../../models/post';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {
  posts$: Observable<any[]>;
  postDoc: AngularFirestoreDocument<Post>;
  public myuid: string;
  nowtime: number;

  constructor(private storage: Storage, private afs: AngularFirestore, public navCtrl: NavController) {
    var uid = "";
    
    this.storage.get('uid').then((val) => {
      uid = val;
      this.myuid = uid;
      
      this.posts$ = this.afs.collection('posts', ref => ref.orderBy('time')).valueChanges();
    });
  }
  
  ionViewWillEnter() {
    var d = new Date();
    this.nowtime = d.getTime();
  }
  
  thankPost(post: Post) {
    var uid = "";
    
    this.storage.get('uid').then((val) => {
      uid = val;
      this.myuid = uid;
      
      if (post.thanks.indexOf(uid) < 0) {
        post.thanks.push(uid);
      } else {
        var index = post.thanks.indexOf(uid);
        post.thanks.splice(index, 1);
      }
      
      if (post.thanks.length == 0) {
        post.numthanks = null;
      } else {
        post.numthanks = post.thanks.length;
      }
      
      var postPath = 'posts/' + post.pid;
      this.postDoc = this.afs.doc<Post>(postPath);
      this.postDoc.update(post);
    });
  }
  
  gonePost(post: Post) {
    var uid = "";
    
    this.storage.get('uid').then((val) => {
      uid = val;
      this.myuid = uid;
      
      if (post.gone.indexOf(uid) < 0) {
        post.gone.push(uid);
      } else {
        var index = post.gone.indexOf(uid);
        post.gone.splice(index, 1);
      }
      
      if (post.gone.length == 0) {
        post.numgone = null;
      } else {
        post.numgone = post.gone.length;
      }
      
      var postPath = 'posts/' + post.pid;
      this.postDoc = this.afs.doc<Post>(postPath);
      this.postDoc.update(post);
    });
  }
   
  getTime(time: number) {
    
    var day = 86400000;
    var hour = 3600000;
    var minute = 60000;
    
    var posttime = Math.abs(time);
    var elapsed = this.nowtime - posttime;
    
    if(elapsed < hour) {
      
      var mins = (elapsed / minute).toString();
      mins = Math.round(mins).toString() + " mins";
      return mins;
      
    } else if(elapsed < day) {
      
      var hrs = (elapsed / hour).toString();
      hrs = Math.round(hrs).toString() + " hrs";
      return hrs;
      
    } else {
      var date = this.getDate(posttime);
      return date;
    }
  }
  
  getDate(time: number) {
    var postdate = new Date(time);
    return postdate.toLocaleDateString();
  }
}
