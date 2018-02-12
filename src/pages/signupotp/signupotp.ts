import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signupotp',
  templateUrl: 'signupotp.html',
})
export class SignupotpPage {
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}
  phoneNumber;
  ionViewDidLoad() {
     }

  signIn(phoneNumber: number){
   
    
  }

}
