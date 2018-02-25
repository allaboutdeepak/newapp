import { Component } from '@angular/core';
import { ViewController, IonicPage,NavParams,Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popup-modal',
  templateUrl: 'popup-modal.html'
})
export class PopupModalPage {
  modalData:any=null;

  constructor(public events: Events,public viewCtrl: ViewController, public navParams: NavParams) {
    this.events.subscribe('group:next', (data,time) => {
       this.dismiss();
    });
    if(this.navParams.get('modalData')){
      this.modalData=this.navParams.get('modalData');
    }
  }

  signup() {
    this.viewCtrl.dismiss();
  }

  login() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
