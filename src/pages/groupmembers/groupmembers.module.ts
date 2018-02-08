import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupmembersPage } from './groupmembers';
import {SharedModule} from "../../app/shared.module";
@NgModule({
  declarations: [
    GroupmembersPage,
  ],
  imports: [
    IonicPageModule.forChild(GroupmembersPage),
    SharedModule
  ],
  exports: [
    GroupmembersPage
  ]
})
export class GroupmembersPageModule {}
