import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2Page {
  toUser : {toUserId: string, toUserName: string};
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,) { 
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
  }

  ionViewWillLoad() {
    console.log('[2] will load fired');
  }

  ionViewDidLoad() {
    console.log('[2] did load fired');
  }

  ionViewWillEnter() {
    console.log('[2] will enter fired');
  }

  ionViewDidEnter() {
    console.log('[2] did enter fired');
  }
  goBack() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot('Page1Page');
    }
  }
  openSignupModal() {
    this.openModal('PopupModalPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal',enableBackdropDismiss: true })
      .present();
  }
  gotoGrouptransactionPage(){
    this.navCtrl.parent.parent.push('GrouptransactionPage');
  }
}
