import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from 'ionic-angular';
import { TransactionsProvider } from '../../providers/transactions';
@Component({
  selector: 'add-transaction',
  templateUrl: 'add-transaction.html'
})
export class AddTransactionComponent {

  transaction = { goods: '',amount: '0.00', date: '', comment: '',type:'personal',user_id:'',token:'' };
	submitted = false;

  constructor( public transactionservice: TransactionsProvider,
    public loadingCtrl: LoadingController) {
    if(localStorage.getItem('userData')){
      var user=JSON.parse(localStorage.getItem('userData')).userData;
      this.transaction.user_id=user.user_id;
      this.transaction.token=user.token;
      
    }
  }

  addTransaction(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      let loader = this.loadingCtrl.create({
        content: 'Loading, please wait..'
      });
      loader.present();
      this.transactionservice.addTransaction(this.transaction,'addPersonalTransaction').then((respose) => {
        loader.dismiss();
        let res:any=respose;
        if(res.transactionData){
          alert('New transaction created');
        }else{
          alert(res.error.text)
        }
       
      }).catch((err) => {
        alert(JSON.stringify(err));
      })

    }
  }
  
}
