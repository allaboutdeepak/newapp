import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-slide-walkthrough',
  templateUrl: 'slide-walkthrough.html',
})
export class SlideWalkthroughPage {

  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [
    {
      title: 'Dream\'s Adventure',
      imageUrl: 'assets/img/avatar/girl-avatar.png',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'For the Weekend',
      imageUrl: 'assets/img/avatar/girl-avatar.png',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'Family Time',
      imageUrl: 'assets/img/avatar/girl-avatar.png',
      description: 'Take a look at our amazing options',
    },
    {
      title: 'My Trip',
      imageUrl: 'assets/img/avatar/girl-avatar.png',
      description: 'Take a look at our amazing options',
    }
  ];

  constructor(public navCtrl: NavController) { 
    if(localStorage.getItem('walkthrough')){

      if(localStorage.getItem('userData')){
        var user=JSON.parse(localStorage.getItem('userData')).userData;
        if(user.otp_verified=="0"){
          this.navCtrl.push('VerifyotpPage',{mobile: user.mobile,code:user.code});
        }else{
          this.navCtrl.setRoot('HomePage');
        }
      }else{
         this.navCtrl.setRoot('SignupotpPage');
      }

    }
  }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
  }

  goToApp() {
    localStorage.setItem('walkthrough',  JSON.stringify(true));
    this.navCtrl.setRoot('SignupotpPage');
  }

  skip() {
    localStorage.setItem('walkthrough',  JSON.stringify(true));
    this.navCtrl.setRoot('SignupotpPage');
  }
}
