import { Component } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { AlertController, LoadingController,ModalController,Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups';
import { Contacts} from '@ionic-native/contacts';
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
  uniqueArray:any=null;
  groupBuddies:any=[];
  constructor( public alertCtrl: AlertController,
    public groupservice: GroupsProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private contacts: Contacts,public events: Events,) {
    console.log('Hello AddTransactionComponent Component');
    
  }

  ngOnInit() {
   
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    if(localStorage.getItem("phoneContacts")){
      this.uniqueArray =JSON.parse(localStorage.getItem("phoneContacts"));
      loader.dismiss();
    }else{
      this.syncContacts();
      loader.dismiss();
    }
  }

  selectGroupBuddies(data){
      var index = this.groupBuddies.indexOf(data);
      (index === -1)?this.groupBuddies.push(data): this.groupBuddies.splice(index, 1);
  }

  addGroupName(){
    this.modalCtrl.create('CreateGroupPage', {groupusers:this.groupBuddies}, { cssClass: 'inset-modal',enableBackdropDismiss: true })
      .present();
      this.events.publish('group:next', this.groupBuddies, Date.now());
  }
  syncContacts(){
    var uniqueContacts=[];
    this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts)=>{
      for(var i = 0; i < contacts.length; i++) {
         if(contacts[i].phoneNumbers !=null && typeof (contacts[i].phoneNumbers) !=null){
          if(contacts[i].phoneNumbers.length >=1){
             for(var j=0;j<contacts[i].phoneNumbers.length; j++){
               if(contacts[i].phoneNumbers[j].value){
                 var newContact={name:'',phone:''};
                 var phone=this.filterMobile(contacts[i].phoneNumbers[j].value);
                 newContact.name=contacts[i].displayName;
                 newContact.phone=phone;
                 if(newContact.name && newContact.phone){
                    uniqueContacts.push(newContact);
                 }
               }
             }
           }
         }
       }
       this.uniqueArray = this.removeDuplicates(uniqueContacts, "phone");
       localStorage.setItem('phoneContacts', JSON.stringify(this.uniqueArray) );           
     }).catch((err)=>{
       console.log(err);
     });
  }
  filterMobile(mobile){
    var filteredMobile = mobile.replace(/([-~!@#$%^&*()_=`{}\[\]\|\\:;'<>,.\/? ])+/g, '');
    filteredMobile=filteredMobile.replace('+91', '');
    return filteredMobile;
  }

removeDuplicates(myArr, prop){  
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
  
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
