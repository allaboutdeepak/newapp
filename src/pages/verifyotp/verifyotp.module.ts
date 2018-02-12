import { VerifyotpPage } from './verifyotp';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    VerifyotpPage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyotpPage),
  ],
  exports: [
    VerifyotpPage
  ]
})

export class VerifyotpPageModule { }
