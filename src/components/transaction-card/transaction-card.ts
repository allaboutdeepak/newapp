import { Component } from '@angular/core';
import { NavController,ModalController,LoadingController,Events } from 'ionic-angular';

/**
 * Generated class for the TransactionCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'transaction-card',
  templateUrl: 'transaction-card.html'
})
export class TransactionCardComponent {
  
 

  constructor(public navCtrl: NavController,
    public events: Events) {
    console.log('Hello TransactionCardComponent Component');
  }
  
}
