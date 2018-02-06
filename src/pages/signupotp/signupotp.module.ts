import { SignupotpPage } from './signupotp';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SignupotpPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupotpPage),
  ],
  exports: [
    SignupotpPage
  ]
})

export class SignupotpPageModule { }
