import { Component } from '@angular/core';
import { NavController,ModalController, NavParams, IonicPage,LoadingController,Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups';

@IonicPage()
@Component({
  selector: 'page-group-expense',
  templateUrl: 'group-expense.html',
})
export class GroupExpensePage {
  allmygroups:any=[];
  loggedUser:any={user_id:'',token:''};
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public modalCtrl: ModalController,
     public loadingCtrl: LoadingController,
     public groupservice: GroupsProvider,
     public events: Events,
    ) { 
   
    this.events.subscribe('group:created', (data,time) => {
     if(this.allmygroups.length>0){
      this.allmygroups.push(data);
     }else{
      this.allmygroups=data;
     }
      
   });
   
   if(localStorage.getItem('userData')){
    var user=JSON.parse(localStorage.getItem('userData')).userData;
    this.loggedUser.user_id=user.user_id;
    this.loggedUser.token=user.token;
  }

  }
  ionViewWillEnter() {
   
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    let data=this.loggedUser;
    this.groupservice.getmygroups(data,'groups').then((res)=>{
     this.allmygroups=res;
    }).catch((e)=>{
      console.log(e);
    });
    loader.dismiss();
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
  segmentChanged(e){
    if(e.value=="New Group"){
      this.openModal('PopupModalPage','addGroup');
    }else{
      this.openModal('PopupModalPage','invite');
    }
    
  }
  openModal(pageName,type?) {
    let modalData;
    if(type && type=="invite"){
       modalData={pageTitle:'Invite friends',selector:'invite'};
    }else{
       modalData={pageTitle:'Create Group',selector:'add-group'};
    }

    this.modalCtrl.create(pageName, {modalData:modalData}, { cssClass: 'inset-modal',enableBackdropDismiss: true })
      .present();
  }
  gotoGrouptransactionPage(groupName){
    this.navCtrl.parent.parent.push('GrouptransactionPage',{groupName:groupName});
  }
}
