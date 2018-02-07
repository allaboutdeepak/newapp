import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Page1Page } from "./page1";
import {ChatService} from "../../providers/chat-service";
import {RelativeTime} from "../../pipes/relative-time";
import {EmojiPickerComponentModule} from "../../components/emoji-picker/emoji-picker.module";
import {EmojiProvider} from "../../providers/emoji";
import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    Page1Page,
    RelativeTime
  ],
  imports: [
    EmojiPickerComponentModule,
    SharedModule,
    IonicPageModule.forChild(Page1Page)
  ],
  exports: [
    Page1Page
  ],
  providers:[
    ChatService,
    EmojiProvider
  ]
})

export class Module {}
