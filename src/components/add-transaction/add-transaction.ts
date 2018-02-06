import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'add-transaction',
  templateUrl: 'add-transaction.html'
})
export class AddTransactionComponent {

  item = { item: '',amount: '', date: '', message: '' };
	submitted = false;

  constructor() {
    console.log('Hello AddTransactionComponent Component');
    
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {}
  }
}
