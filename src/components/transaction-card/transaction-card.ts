import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello TransactionCardComponent Component');
    this.text = 'Hello World';
  }

}
