import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html'
})
export class AddPostPage {
  
  post = {} as Post;

  constructor(public navCtrl: NavController) {

  }

  addPost(post: Post) {
    
  }

}
