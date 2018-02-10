// Global state (used for theming)
import { AppState } from './app.global';

// Providers
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { GroupsProvider } from '../providers/groups/groups';
import { TransactionsProvider } from '../providers/transaction/transaction';
import { RequestsProvider } from '../providers/requests/requests';
//import { ToastService } from '../providers/util/toast.service';
//import { AlertService } from '../providers/util/alert.service';
//import { CameraProvider } from '../providers/util/camera.provider';
//import { NativeGoogleMapsProvider } from '../providers/native-google-maps/native-google-maps';

// Ionic native providers
//import { CardIO } from '@ionic-native/card-io';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { Camera } from '@ionic-native/camera';
//import { Diagnostic } from '@ionic-native/diagnostic';
//import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { GoogleMaps } from '@ionic-native/google-maps';

// Directives
//import { SlidingDrawer } from '../components/sliding-drawer/sliding-drawer';

// Modules
//import { SwingModule } from 'angular2-swing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { config } from './app.firebaseconfig';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

export const MODULES = [
  BrowserModule,
  HttpClientModule,
  AngularFireModule.initializeApp(config)
];

export const PROVIDERS = [
  AppState,
  StatusBar,
  SplashScreen,
  AuthProvider,
  AngularFireAuth,
  UserProvider,
  GroupsProvider,
  TransactionsProvider,
  RequestsProvider

];

export const DIRECTIVES = [
  //SlidingDrawer,
  //Autosize,
];
