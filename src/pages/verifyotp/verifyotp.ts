import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams, AlertController,ToastController,LoadingController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
@IonicPage()
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html',
})
export class VerifyotpPage {
  resposeData : any;
  userData = {mobile:"", code:"91"};
  constructor(
      public authService : AuthService,
      public navCtrl: NavController,
      public navParams: NavParams,
      public alertCtrl: AlertController,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController)
        {
        if(localStorage.getItem('userData')){
          var user=JSON.parse(localStorage.getItem('userData')).userData;
          if(user.otp_verified=="1"){
            this.navCtrl.setRoot('HomePage');
          }
          this.userData.mobile=user.mobile;
          this.userData.code=user.code;
        }
      }
    
    verifyOTP(){
  
      if(this.userData){
        this.authService.verifyotp(this.userData, "verifyOTP").then((result) =>{
          this.resposeData = result;
          if(this.resposeData.userData){
           
            if(this.resposeData.userData && this.resposeData.userData.code==="201"){
              this.presentToast("Invalid OTP");
            }else{
              localStorage.setItem('userData', JSON.stringify(this.resposeData) );
              
            this.navCtrl.push('HomePage', {mobile: this.userData.mobile,code:this.userData.code});
            }
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

  next(el) {
    el.setFocus();
  }
  resendOTP(){
    //this.mobile
  }
}
