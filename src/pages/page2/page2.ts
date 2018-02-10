import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, IonicPage,LoadingController,Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups/groups';
@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2Page {
  allmygroups;
  toUser : {toUserId: string, toUserName: string};
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public loadingCtrl: LoadingController,
     public groupservice: GroupsProvider,
     public events: Events) { 
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
  }
  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('newgroup', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }
  ionViewDidLeave() {
    this.events.unsubscribe('newgroup');
  }
  ionViewWillLoad() {
    console.log('[2] will load fired');
  }

  ionViewDidLoad() {
    console.log('[2] did load fired');
  }

  ionViewDidEnter() {
    console.log('[2] did enter fired');
  }
  goBack() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot('Page1Page');
    }
  }
  openSignupModal() {
    this.openModal('PopupModalPage');
  }

  openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal',enableBackdropDismiss: true })
      .present();
  }
  gotoGrouptransactionPage(groupName){
    this.navCtrl.parent.parent.push('GrouptransactionPage',{groupName:groupName});
  }
}
