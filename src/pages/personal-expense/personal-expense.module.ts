import { SharedModule } from '../../app/shared.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalExpensePage } from './personal-expense';

@NgModule({
  declarations: [
    PersonalExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalExpensePage),SharedModule
  ],
})
export class PersonalExpensePageModule {}
