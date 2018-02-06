import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddTransactionComponent } from './add-transaction/add-transaction';
export const components = [AddTransactionComponent];

@NgModule({
  declarations: [components],
  imports: [IonicModule,],
  exports: [components]
})
export class ComponentsModule {}
