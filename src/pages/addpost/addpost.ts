import { Component } from '@angular/core';
import { Post } from '../../models/post';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastService } from '../../services/toast.service';
import { TabsPage } from '../tabs/tabs';

// import { storage } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'page-addpost',
  templateUrl: 'addpost.html'
})
export class AddPostPage {
  
  post = {} as Post;

  constructor(private afs: AngularFirestore, private toast: ToastService, private storage: Storage, public navCtrl: NavController, private camera: Camera) {

  }

  addPost(post: Post) {
    var uid = "";
    var username = "";
    var location = post.location;
    var info = post.info;
    var photopath = "nopath";
    var d = new Date();
    var time = d.getTime() * -1;
    var thanks = [];
    var numthanks = null;
    var gone = [];
    var numgone = null;
    
    this.storage.get('uid').then((val1) => {
      uid = val1;
      
      this.storage.get('username').then((val2) => {
        username = val2;
        
        const posts = this.afs.collection<Post>('posts');
        var pid = this.afs.createId();
        
        posts.doc(pid).set({ pid: pid,
                             uid: uid,
                             username: username,
                             location: location,
                             info: info,
                             photopath: photopath,
                             time: time,
                             thanks: thanks,
                             numthanks: numthanks,
                             gone: gone,
                             numgone: numgone
        });
        
        // console.log('pid: ', pid);
        // console.log('uid: ', uid);
        // console.log('username: ', username);
        // console.log('location: ', location);
        // console.log('info: ', info);
        // console.log('path: ', photopath);
        // console.log('time: ', time);
        
        this.navCtrl.parent.select(0);
      });
    });
  }
  
  takePhoto() {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    this.savePhoto(options);
  }
  
  addLibraryPhoto () {
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0,
      correctOrientation: true
    }
    
    this.savePhoto(options);
  }
    
  async savePhoto (options) {
    
    // const result = await this.camera.getPicture(options);
    // const image = 'data:image/jpeg;base64,${result}';
    
    //this.toast.show(image.toString(), 1000);
    
    //const pictures = firebase.storage().ref('pictures/myPhoto');
    
    //this.toast.show(pictures.toString(), 1000);
    
    //pictures.putString(image, 'data_url');
    
  }
  

}
