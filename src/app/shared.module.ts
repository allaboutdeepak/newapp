import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { DIRECTIVES } from './app.imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
@NgModule({
  declarations: [
    DIRECTIVES,
  ],
  imports: [
    IonicModule,
    PipesModule,
    ComponentsModule
  ],
  exports: [
    ComponentsModule,
    PipesModule,
    SuperTabsModule
  ]
})

export class SharedModule { }
