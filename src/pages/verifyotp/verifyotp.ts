import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html',
})
export class VerifyotpPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}
  mobile;
  ionViewDidLoad() {
   this.mobile=this.navParams.get('mobile');
     }

  next(el) {
    el.setFocus();
  }
  resendOTP(){
    //this.mobile
  }
}
