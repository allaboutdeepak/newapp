import { Component } from '@angular/core';
//import { NgForm } from '@angular/forms';
import {  AlertController, LoadingController } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups';
@Component({
  selector: 'add-group',
  templateUrl: 'add-group.html'
})
export class AddGroupComponent {
  newgroup = {
    groupName: 'GroupName',
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
  }
	submitted = false;

  constructor( public alertCtrl: AlertController,
    public groupservice: GroupsProvider,
    public loadingCtrl: LoadingController) {
    console.log('Hello AddTransactionComponent Component');
    
  }

  creategroup() {
    // let loader = this.loadingCtrl.create({
    //   content: 'Loading, please wait..'
    // });
    // loader.present();
    // this.groupservice.addgroup(this.newgroup).then(() => {
    //   loader.dismiss();
    //   alert('New group created');
    // }).catch((err) => {
    //   alert(JSON.stringify(err));
    // })
  }

}
