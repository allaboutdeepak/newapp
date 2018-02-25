import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams,ToastController ,Events} from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups';
/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {
  img='https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  newgroup:any={user_id:'',token:'',image:this.img,name:'',groupBuddies:[]}
  loggedUser:any={user_id:'',token:''};
  constructor(public viewCtrl: ViewController,
    public navCtrl: NavController,
     public navParams: NavParams,
     public toastCtrl: ToastController,
     public events: Events,
     public groupservice: GroupsProvider
    ) {

      if(localStorage.getItem('userData')){
        var user=JSON.parse(localStorage.getItem('userData')).userData;
        this.loggedUser.user_id=user.user_id;
        this.loggedUser.token=user.token;
      }
    if( this.navParams.get('groupusers')){
      this.newgroup.groupBuddies= this.navParams.get('groupusers');
   }

  }

  creategroup() {
    if(this.newgroup.name){
      this.newgroup.user_id=this.loggedUser.user_id;
      this.newgroup.token=this.loggedUser.token;
      this.groupservice.createNewGroup(this.newgroup,'createGroup').then((res)=>{
        let response:any=res;
        if(response.error.text=="Duplicate group"){
          this.presentToast('Duplicate group');
        }else{
          console.log('Group created',res);
          this.presentToast('Group created');
          this.viewCtrl.dismiss();
          this.events.publish('group:created', this.newgroup, Date.now());
        }
        
      }).catch((err)=>{
        this.presentToast('Group created');
        this.viewCtrl.dismiss();
        this.events.publish('group:created', this.newgroup, Date.now());
        //this.presentToast('Failed to create group'+ JSON.stringify(err) );
        //console.log(JSON.stringify(err));
      });
     
    }else{
      this.presentToast('Please provide a group name.');
    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
