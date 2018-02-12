// Global state (used for theming)
import { AppState } from './app.global';

// Providers

import {AuthService} from "../providers/auth-service";
import { Common } from "../providers/common";

import { GroupsProvider } from '../providers/groups';
import { TransactionsProvider } from '../providers/transactions';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { MomentModule } from 'angular2-moment';
export const MODULES = [
  BrowserModule,
  HttpClientModule,
  HttpModule,
  MomentModule
];

export const PROVIDERS = [
  AppState,
  StatusBar,
  SplashScreen,
  AuthService,
  Common,
  GroupsProvider,
  TransactionsProvider,

];

export const DIRECTIVES = [
  
];
