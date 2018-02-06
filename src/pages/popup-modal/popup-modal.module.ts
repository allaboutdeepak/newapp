import { SharedModule } from '../../app/shared.module';
import { PopupModalPage } from './popup-modal';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    PopupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupModalPage),
    SharedModule
  ],
  exports: [
    PopupModalPage
  ]
})

export class PopupModalPageModule { }
