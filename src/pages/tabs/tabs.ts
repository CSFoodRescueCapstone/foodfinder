import { Component } from '@angular/core';


import { FeedPage } from '../home/home';
import { FeedPage } from '../about/about';
import { AddPostPage } from '../contact/contact';


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
