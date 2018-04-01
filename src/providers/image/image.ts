// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor() {
    console.log('Hello ImageProvider Provider');
  }
  
  uploadImage(image: string, userId: string, photoId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${photoId}.jpg`);
    // return imageRef.putString(image, 'data_url');
    return imageRef.putString(image);
    // return imageRef.putString(image, firebase.storage.StringFormat.DATA_URL);
  }
  
  getImage(userId: string, photoId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${photoId}`);
    return imageRef.getDownloadURL();
  }
}
