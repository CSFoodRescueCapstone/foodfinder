import { Component } from '@angular/core';


import { FeedPage } from '../feed/feed';
import { MapPage } from '../map/map';
import { AddPostPage } from '../addpost/addpost';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = MapPage;
  tab3Root = AddPostPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
