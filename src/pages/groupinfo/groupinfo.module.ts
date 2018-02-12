import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import { GroupinfoPage } from './groupinfo';

@NgModule({
  declarations: [
    GroupinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupinfoPage),
    SharedModule
  ],
  exports: [
    GroupinfoPage
  ]
})
export class GroupinfoPageModule {}
