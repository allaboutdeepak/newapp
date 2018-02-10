import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transaction/transaction';
@Component({
  selector: 'add-transaction',
  templateUrl: 'add-transaction.html'
})
export class AddTransactionComponent {

  transaction = { goods: 'goods',amount: '0.00', date: '', comment: '',type:'personal' };
	submitted = false;

  constructor( public transactionservice: TransactionsProvider,
    public loadingCtrl: LoadingController) {
    console.log('Hello AddTransactionComponent Component');
    
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let loader = this.loadingCtrl.create({
        content: 'Loading, please wait..'
      });
      loader.present();
      this.transactionservice.addTransaction(this.transaction).then(() => {
        loader.dismiss();
        alert('New transaction created');
      }).catch((err) => {
        alert(JSON.stringify(err));
      })

    }
  }
}
