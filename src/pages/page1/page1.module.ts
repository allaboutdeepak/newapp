import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page1Page } from "./page1";
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    Page1Page,
  ],
  imports: [
    SharedModule,
    IonicPageModule.forChild(Page1Page)
  ],
  exports: [
    Page1Page
  ],
  providers:[
  ]
})

export class Module {}
