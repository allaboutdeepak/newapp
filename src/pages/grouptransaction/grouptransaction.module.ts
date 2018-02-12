import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrouptransactionPage } from "./grouptransaction";
import {ChatService} from "../../providers/chat-service";
import { SharedModule } from '../../app/shared.module';
//import {RelativeTime} from "../../pipes/relative-time";
//import {EmojiPickerComponentModule} from "../../components/emoji-picker/emoji-picker.module";
//import {EmojiProvider} from "../../providers/emoji";

@NgModule({
  declarations: [
    GrouptransactionPage,
   // RelativeTime
  ],
  imports: [
    //EmojiPickerComponentModule,
    SharedModule,
    IonicPageModule.forChild(GrouptransactionPage)
  ],
  exports: [
    GrouptransactionPage
  ],
  providers:[
    ChatService,
    //EmojiProvider
  ]
})

export class Module {}
