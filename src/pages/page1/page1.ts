import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams,ModalController,LoadingController } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { TransactionsProvider } from '../../providers/transaction/transaction';
@IonicPage()
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1Page {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;
    allmytransactions;
    constructor(navParams: NavParams,
                private chatService: ChatService,
                private events: Events,
                public modalCtrl: ModalController,
                public loadingCtrl: LoadingController,
                public  transactionservice: TransactionsProvider,
                ) {
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
    }
    ionViewWillEnter() {
        let loader = this.loadingCtrl.create({
          content: 'Getting your transactions, Please wait...'
        });
        loader.present();
        this.transactionservice.getmytransactions();
        loader.dismiss();
        this.events.subscribe('newtransaction', () => {
          this.allmytransactions = this.transactionservice.mytransactions;
          console.log(this.allmytransactions);
        })
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

    
}
