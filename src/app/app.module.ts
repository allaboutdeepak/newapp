import { SharedModule } from './shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from "@ionic/storage"; //<-add this
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MODULES, PROVIDERS } from './app.imports';
@NgModule({
  declarations: [
    // App Core
    MyApp,
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__yourappname',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }), //<-add this
    SharedModule,
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [PROVIDERS, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
