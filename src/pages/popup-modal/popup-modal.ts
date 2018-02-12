import { Component } from '@angular/core';
import { ViewController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popup-modal',
  templateUrl: 'popup-modal.html'
})
export class PopupModalPage {


  constructor(public viewCtrl: ViewController) {
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
