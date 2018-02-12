// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage,NavController,NavParams,ToastController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
//import { Storage } from '@ionic/storage';
//import { usercreds } from '../../models/interfaces/usercreds';
//import { AuthProvider } from '../../providers/auth/auth';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  resposeData : any;
  userData = {"username":"", "password":""};
  //credentials = {} as usercreds;

  //public loginForm: any;
 // public backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    private toastCtrl:ToastController
  ) {
      if(localStorage.getItem('userData')){
        this.navCtrl.setRoot('HomePage');
      }
   }

   login(){
          if(this.userData.username && this.userData.password){
          this.authService.postData(this.userData, "login").then((result) =>{
          this.resposeData = result;
          console.log(this.resposeData);
          if(this.resposeData.userData){
            localStorage.setItem('userData', JSON.stringify(this.resposeData) )
          this.navCtrl.push('HomePage');
        }
        else{
          this.presentToast("Please give valid username and password");
        }
 
        }, (err) => {
          //Connection failed message
        });
        }
        else{
        this.presentToast("Give username and password");
        }
   
   }

  signup() {
    this.navCtrl.push('SignupPage');
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
