import { ParallaxHeaderDirectiveModule } from '../../components/parallax-header/parallax-header.module';
import { ReferralPage } from './referral';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    ReferralPage,
  ],
  imports: [
    IonicPageModule.forChild(ReferralPage),
    ParallaxHeaderDirectiveModule
  ],
  exports: [
    ReferralPage
  ]
})

export class ReferralPageModule { }
