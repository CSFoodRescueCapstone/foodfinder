import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ImageProvider Provider');
  }
  
  uploadImage(image: string, userId: string, photoID: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${photoID}.jpg`);
    return imageRef.putString(image, 'data_url');
  }
  
  getImage(userId: string, photoId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${photoID}`);
    return imageRef.getDownloadURL();
  }
}
