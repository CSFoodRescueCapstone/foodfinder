import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html'
})
export class AddPostPage {
  
  post = {} as Post;

  constructor(private storage: Storage, public navCtrl: NavController) {

  }

  addPost(post: Post) {
    console.log('location: ', post.location);
    console.log('info: ', post.info);
    
    this.storage.get('loggedin').then((val) => {
      console.log('loggedin: ', val);
    });
    
    this.storage.get('uid').then((val) => {
      console.log('uid: ', val);
    });
  }

}
