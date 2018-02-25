import { Component } from '@angular/core';
import { AlertController, LoadingController,ModalController,Events } from 'ionic-angular';
import { Contacts} from '@ionic-native/contacts';
import { SocialSharing } from '@ionic-native/social-sharing';
@Component({
  selector: 'invite',
  templateUrl: 'invite.html'
})
export class InviteComponent {
  newgroup = {
    groupName: 'GroupName',
    groupPic: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
  }
	submitted = false;
  uniqueArray:any=null;
  groupBuddies:any=[];
  constructor( public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private contacts: Contacts,public events: Events,
    private socialSharing: SocialSharing) {
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
 inviteFriend(){
   this.socialSharing.shareViaWhatsApp('Join the PAIPAI to track your daily expenses.sign up via this referral code ADE65A and get 50 points.').then((res)=>{
    console.log('success');
   }).catch((e)=>{
    console.log('failed');
   });
 }

}

