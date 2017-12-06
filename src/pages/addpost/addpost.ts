import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from "angularfire2/database";
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html'
})
export class AddPostPage {
  
  post = {} as Post;
  
  const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  }

  constructor(private af: AngularFireDatabase, private storage: Storage, public navCtrl: NavController, private camera: Camera) {

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
  
  takePicture() {
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
    
  }
  

}
