import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signupotp',
  templateUrl: 'signupotp.html',
})
export class SignupotpPage {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public  toastCtrl: ToastController,) {}
  phoneNumber:any=null;
  code:any='91';

  verifyMobile(){

    if(this.phoneNumber){
      this.presentToast('Please enter the otp you recieved.');
      this.navCtrl.push('VerifyotpPage', {mobile: this.phoneNumber});
    }else{
      this.presentToast('Please provide valid mobile number.');
    }    
   
  }
  
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
