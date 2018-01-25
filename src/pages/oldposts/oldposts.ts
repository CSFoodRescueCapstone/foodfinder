import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Post } from '../../models/post';
import { ToastService } from '../../services/toast.service';

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
  
  posts$: Observable<any[]>;
  postDoc: AngularFirestoreDocument<Post>;
  public myuid: string;

  constructor(private toast: ToastService, private storage: Storage, private afs: AngularFirestore, public navCtrl: NavController) {
    var uid = "";
    
    this.storage.get('uid').then((val) => {
      uid = val;
      this.myuid = uid;
      
      this.posts$ = this.afs.collection('posts', ref => ref.where('uid', '==', uid).orderBy('time')).valueChanges();
    });
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
      
      var mins = (elapsed / minute);
      var stringmins = Math.round(mins).toString() + " mins";
      return stringmins;
      
    } else if(elapsed < day) {
      
      var hrs = (elapsed / hour);
      var stringhrs = Math.round(hrs).toString() + " hrs";
      return stringhrs;
      
    } else {
      var date = this.getDate(posttime);
      return date;
    }
  }
  
  getDate(time: number) {
    var postdate = new Date(time);
    return postdate.toLocaleDateString();
  }
  
  deletePost(post: Post) {
      var postPath = 'posts/' + post.pid;
      this.postDoc = this.afs.doc<Post>(postPath);
      this.postDoc.delete();
      this.toast.show('Post deleted.', 1000);
  }

}
