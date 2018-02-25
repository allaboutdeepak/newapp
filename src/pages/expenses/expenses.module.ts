import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesPage } from './expenses';

import {SharedModule} from "../../app/shared.module";

@NgModule({
  declarations: [
    ExpensesPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesPage),SharedModule
  ],
})
export class ExpensesPageModule {}
