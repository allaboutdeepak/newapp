import { SharedModule } from '../../app/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupExpensePage } from './group-expense';


@NgModule({
  declarations: [
    GroupExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupExpensePage),
    SharedModule
  ],
  exports: [
    GroupExpensePage
  ]
})
export class GroupExpensePageModule {}
