import { Component, ViewChild } from '@angular/core';
import { NavController,ModalController,IonicPage, NavParams,ActionSheetController, LoadingController } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import firebase from 'firebase';
import { GroupsProvider } from '../../providers/groups/groups';
@IonicPage()
@Component({
  selector: 'page-grouptransaction',
  templateUrl: 'grouptransaction.html'
})
export class GrouptransactionPage {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;


    groupName="dailyexpense";
    owner: boolean = false;
    newmessage;
    allgroupmsgs;
    alignuid;
    photoURL;
    imgornot;

    constructor(navParams: NavParams,
                private chatService: ChatService,
                 public modalCtrl: ModalController,
                 public navCtrl: NavController,
                   public groupservice: GroupsProvider,
                public actionSheet: ActionSheetController,
                 public events: Events,
                   public loadingCtrl: LoadingController) {
        // Get the navParams toUserId parameter
        this.toUser = {
            id: '210000198410281948',//navParams.get('toUserId')
            name:'Luff',// navParams.get('toUserName')
        };
        // Get mock user information
        this.chatService.getUserInfo()
        .then((res) => {
            this.user = res
        });

        this.alignuid = firebase.auth().currentUser.uid;
        this.photoURL = firebase.auth().currentUser.photoURL;
        this.groupName = navParams.get('groupName');
        this.groupservice.getownership(this.groupName).then((res) => {
          if (res)
            this.owner = true;  
        }).catch((err) => {
          alert(err);
          })


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
                this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
              }
            },
            {
              text: 'Delete Group',
              icon: 'trash',
              handler: () => {
                this.groupservice.deletegroup().then(() => {
                  this.navCtrl.pop();
                }).catch((err) => {
                  console.log(err);
                })
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
                this.groupservice.leavegroup().then(() => {
                  this.navCtrl.pop();
                }).catch((err) => {
                  console.log(err);
                })
              }
            },
            {
              text: 'Group Info',
              icon: 'person',
              handler: () => {
                this.navCtrl.push('GroupinfoPage', {groupName: this.groupName});
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
         this.getMsg();
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    private getMsg() {
        // Get mock message list
        return this.chatService
        .getMsgList()
        .subscribe(res => {
            this.msgList = res;
            this.scrollToBottom();
        });
    }

    /**
     * @name sendMsg
     */
    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';

        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }

        this.chatService.sendMsg(newMsg)
        .then(() => {
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
                this.msgList[index].status = 'success';
            }
        })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */
    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
              toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    scrollToBottom() {
      try{
        setTimeout(() => {
          if (this.content.scrollToBottom) {
              this.content.scrollToBottom();
          }
      }, 400)
      }catch(e){
        console.log(e);
      }
       
    }

    openAddItemModal(){
        this.openModal('PopupModalPage');
    }
    openModal(pageName) {
    this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal',enableBackdropDismiss: true })
        .present();
    }
}
