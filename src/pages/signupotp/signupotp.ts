import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController,ToastController,LoadingController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
@IonicPage()
@Component({
  selector: 'page-signupotp',
  templateUrl: 'signupotp.html',
})
export class SignupotpPage {
  resposeData : any;
  userData = {mobile:"", code:"91"};
  constructor(public navCtrl: NavController,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public toastCtrl: ToastController,
     public authService : AuthService,
    ) {
      if(localStorage.getItem('userData')){
        var user=JSON.parse(localStorage.getItem('userData')).userData;
        if(user.otp_verified=="0" && user.otp_requested=="1"){
          this.navCtrl.push('VerifyotpPage',{mobile: user.mobile,code:user.code});
        }else{
          this.navCtrl.setRoot('HomePage');
        }
      }
      
    }
  

  verifyMobile(){

    if(this.userData){

      this.authService.sendotp(this.userData, "sendOTP").then((result) =>{
        this.resposeData = result;
        if(this.resposeData.userData){
          localStorage.setItem('userData', JSON.stringify(this.resposeData) )
          this.navCtrl.push('VerifyotpPage');
        }
        else{
          this.presentToast("Please give valid username and password");
        }
        
        }, (err) => {
          this.presentToast('Please provide valid mobile number error.');
        });
      
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
