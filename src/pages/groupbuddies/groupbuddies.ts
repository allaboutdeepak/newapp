import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GroupsProvider } from '../../providers/groups';

/**
 * Generated class for the GroupbuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-groupbuddies',
  templateUrl: 'groupbuddies.html',
})
export class GroupbuddiesPage {
  myfriends = [];
  groupmembers = [];
  searchstring;
  tempmyfriends = [];
  newbuddy;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public events: Events, public groupservice: GroupsProvider) {
  }

  ionViewWillEnter() {
   
  }


  addbuddy(buddy) {
    this.newbuddy = buddy;
    //this.groupservice.addmember(buddy);
  }

}
