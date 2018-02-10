import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddTransactionComponent } from './add-transaction/add-transaction';
import { PopupMenuComponent } from './popup-menu/popup-menu';
import { TransactionCardComponent } from './transaction-card/transaction-card';
import { AddGroupComponent } from './add-group/add-group';
export const components = [AddTransactionComponent,PopupMenuComponent,
  TransactionCardComponent,AddGroupComponent];

@NgModule({
  declarations: [components],
  imports: [IonicModule],
  exports: [components]
})
export class ComponentsModule {}
