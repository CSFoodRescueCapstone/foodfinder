import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html'
})
export class AddPostPage {
  
  post = {} as Post;

  constructor(private af: AngularFireDatabase, private storage: Storage, public navCtrl: NavController) {

  }

  addPost(post: Post) {
    var uid = "";
    var location = post.location;
    var info = post.info;
    var photopath = "nopath";
    var d = new Date();
    var time = d.getTime();
    
    this.storage.get('uid').then((val) => {
      uid = val;
      
      this.af.list("posts").push({ uid, time, location, info, photopath });
      
      console.log('uid: ', uid);
      console.log('time: ', time);
      console.log('location: ', location);
      console.log('info: ', info);
      console.log('path: ', photopath);
    });
  }

}
