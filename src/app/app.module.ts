import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPostPage } from '../pages/addpost/addpost';
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2'; // LH added for add angularfire
import { FIREBASE_CONFIG } from './firebase.credentials'; // LH added for add angularfire
import { AngularFireDatabaseModule } from 'angularfire2/database'; // LH added for add angularfire
import { AngularFireAuthModule } from "angularfire2/auth";

@NgModule({
  declarations: [
    MyApp,
    AddPostPage,
    ProfilePage,
    FeedPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG), // LH added for add angularfire
    AngularFireDatabaseModule // LH added for add angularfire
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPostPage,
    ProfilePage,
    FeedPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
