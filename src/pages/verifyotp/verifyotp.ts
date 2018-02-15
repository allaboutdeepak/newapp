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
  userData = {mobile:"", otp:"", code:"91"};
  otp={otp1:'',otp2:'',otp3:'',otp4:''};
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
          //alert(user.otp_verified);
          if(user.otp_verified=="1" && user.otp_requested=="0"){
            this.navCtrl.setRoot('HomePage');
          }
          this.userData.mobile=user.mobile;
          this.userData.code=user.code;
        }
      }
    
    verifyOTP(){
      this.userData.otp=this.otp.otp1+this.otp.otp2+this.otp.otp3+this.otp.otp4;
      if(this.userData && this.userData.otp!=''){
        this.authService.verifyotp(this.userData, "verifyOTP").then((result) =>{
          this.resposeData = result;
          if(this.resposeData.userData){
           
            if(this.resposeData.userData && this.resposeData.userData.code=="201"){
              this.presentToast("Invalid OTP");
            }else{
              localStorage.setItem('userData', JSON.stringify(this.resposeData) );
              
            this.navCtrl.setRoot('HomePage', {mobile: this.userData.mobile,code:this.userData.code});
            }
          }
          else{
            this.presentToast("Please provide valid OTP");
          }
          
          }, (err) => {
            this.presentToast('Please provide OTP.');
          });
        
      }else{
        this.presentToast('Please provide OTP.');
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
