import { Component, ViewChild } from '@angular/core';
import { NavController,ModalController,IonicPage, NavParams,ActionSheetController, LoadingController } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grouptransaction',
  templateUrl: 'grouptransaction.html'
})
export class GrouptransactionPage {

   
    

    constructor(navParams: NavParams,
                 public modalCtrl: ModalController,
                 public navCtrl: NavController,
                public actionSheet: ActionSheetController,
                 public events: Events,
                   public loadingCtrl: LoadingController) {
        



    }

    presentOwnerSheet() {
        let sheet = this.actionSheet.create({
          title: 'Group Actions',
          buttons: [
            {
              text: 'Add member',
              icon: 'person-add',
              handler: () => {
                this.navCtrl.push('GroupbuddiesPage');
              }
            },
            {
              text: 'Remove member',
              icon: 'remove-circle',
              handler: () => {
                this.navCtrl.push('GroupmembersPage');
              }
            },
            {
              text: 'Group Info',
              icon: 'person',
              handler: () => {
                //this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
              }
            },
            {
              text: 'Delete Group',
              icon: 'trash',
              handler: () => {
                // this.groupservice.deletegroup().then(() => {
                //   this.navCtrl.pop();
                // }).catch((err) => {
                //   console.log(err);
                // })
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              icon: 'cancel',
              handler: () => {
                console.log('Cancelled');
              }
            }
          ]
        })
        sheet.present();
      }
    
      presentMemberSheet() {
        let sheet = this.actionSheet.create({
          title: 'Group Actions',
          buttons: [
            {
              text: 'Leave Group',
              icon: 'log-out',
              handler: () => {
                // this.groupservice.leavegroup().then(() => {
                //   this.navCtrl.pop();
                // }).catch((err) => {
                //   console.log(err);
                // })
              }
            },
            {
              text: 'Group Info',
              icon: 'person',
              handler: () => {
               // this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              icon: 'cancel',
              handler: () => {
                console.log('Cancelled');
              }
            }
          ]
        })
        sheet.present();
      }



    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
       
    }

  

    openAddItemModal(){
        this.openModal('PopupModalPage');
    }
    openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal',enableBackdropDismiss: true })
        .present();
    }
}
