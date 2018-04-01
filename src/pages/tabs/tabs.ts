import { Component } from '@angular/core';


import { FeedPage } from '../feed/feed';
import { AddPostPage } from '../addpost/addpost';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = AddPostPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
