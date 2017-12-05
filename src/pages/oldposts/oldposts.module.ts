import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OldPostsPage } from './oldposts';

@NgModule({
  declarations: [
    OldPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(OldPostsPage),
  ],
})
export class OldPostsPageModule {}
