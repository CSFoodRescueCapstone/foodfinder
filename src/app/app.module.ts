import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { AddPostPage } from '../pages/addpost/addpost';
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { OldPostsPage } from '../pages/oldposts/oldposts';
import { SettingsPage } from '../pages/settings/settings';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastService } from '../services/toast.service';

import { Camera } from '@ionic-native/camera';
import { ImageProvider } from '../providers/image/image';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { GoogleMaps } from '@ionic-native/google-maps';

import { ConferenceData } from '../providers/conference-data';


@NgModule({
  declarations: [
    MyApp,
    AddPostPage,
    ProfilePage,
    FeedPage,
    TabsPage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    OldPostsPage,
    SettingsPage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPostPage,
    ProfilePage,
    FeedPage,
    TabsPage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    OldPostsPage,
    SettingsPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConferenceData,
    ToastService,
    Camera,
    ImageProvider
  ]
})
export class AppModule {}
