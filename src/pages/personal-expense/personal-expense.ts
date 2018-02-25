import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams,ModalController,LoadingController,NavController, App, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service";
import { Common } from "../../providers/common";
import { TransactionsProvider } from '../../providers/transactions';

@IonicPage()
@Component({
  selector: 'page-personal-expense',
  templateUrl: 'personal-expense.html',
})
export class PersonalExpensePage {
  public userDetails: any;
  public resposeData: any;
  public transData: any;
  public noRecords: boolean;
  userPostData = {
      user_id: "",
      token: "",
    };
  constructor(public common: Common,
      private alertCtrl: AlertController,
      public navCtrl: NavController,
      public app: App,
      public authService: AuthService,
      public modalCtrl: ModalController,
      public transactionservice: TransactionsProvider,
      public loadingCtrl: LoadingController
              ) {
                  const data = JSON.parse(localStorage.getItem("userData"));
                  this.userDetails = data.userData;
                  this.userPostData.user_id = this.userDetails.user_id;
                  this.userPostData.token = this.userDetails.token;
                  this.noRecords = false
                  this.userTransaction();         
    
  }

 
 
  openAddItemModal() {
    let modalData;
    modalData={pageTitle:'Add new transaction',selector:'add-transaction',type:'personal'};
    this.modalCtrl.create('PopupModalPage', {modalData:modalData}, { cssClass: 'inset-modal',enableBackdropDismiss: true })
      .present();
  }


  userTransaction(){
    let loader = this.loadingCtrl.create({
      content: 'Loading, please wait..'
    });
    loader.present();
    this.transactionservice.userTransaction(this.userDetails,'getPersonalTransaction').then((respose) => {
      loader.dismiss();
      let res:any=[];
      res=respose;
      this.transData=res.transactionData;
    }).catch((err) => {
      console.error(JSON.stringify(err));
    })
  }

    doInfinite(e): Promise<any> {
      console.log("Begin async operation");
      return new Promise(resolve => {
        resolve();
      });
    }

    backToWelcome() {
      const root = this.app.getRootNav();
      root.popToRoot();
    }
  
    logout() {
      localStorage.clear();
      setTimeout(() => this.backToWelcome(), 1000);
    }
 



}
