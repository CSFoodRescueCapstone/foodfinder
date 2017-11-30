import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AddPostPage } from '../pages/addpost/addpost';
import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2'; // LH added for add angularfire
import { FIREBASE_CONFIG } from './firebase.credentials'; // LH added for add angularfire
import { AngularFireDatabaseModule } from 'angularfire2/database'; // LH added for add angularfire


@NgModule({
  declarations: [
    MyApp,
    AddPostPage,
    ProfilePage,
    FeedPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG), // LH added for add angularfire
    AngularFireDatabaseModule // LH added for add angularfire
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPostPage,
    ProfilePage,
    FeedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
