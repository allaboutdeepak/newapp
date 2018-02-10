import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {SharedModule} from "../../app/shared.module";
import { GroupbuddiesPage } from './groupbuddies';

@NgModule({
  declarations: [
    GroupbuddiesPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupbuddiesPage),
    SharedModule
  ],
  exports: [
    GroupbuddiesPage
  ]
})
export class GroupbuddiesPageModule {}
