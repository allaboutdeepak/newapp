import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Subject';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage = new Subject();

  pages: Array<{ title: string, component: any, active: boolean, icon: string}>;
  rightMenuItems: Array<{ icon: string, active: boolean }>;
  state: any;
  placeholder = 'assets/img/avatar/girl-avatar.png';
  chosenPicture: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashscreen: SplashScreen,
    public global: AppState,
    public menuCtrl: MenuController,
    private storage: Storage
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'Reports', component: 'ReportsPage', active: false, icon: 'analytics' },
      { title: 'Referral', component: 'ReferralPage', active: false, icon: 'basket' },
      { title: 'Socialpage', component: 'CardSocialPage', active: false, icon: 'map' },
      { title: 'Chat', component: 'Chat', active: false, icon: 'camera' },
      { title: 'Logout', component: 'SignupotpPage', active: false, icon: 'power' },
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
      this.menuCtrl.enable(false, 'right');
  
      this.storage.get('walkthrough').then((walkthrough) => {
        if(walkthrough){
          
          this.storage.get('loggedIn').then((loggedIn) => {
              if(loggedIn){
                this.rootPage='HomePage';
              }else{
                this.rootPage='LoginPage';
              }
            });
        }else{
          this.rootPage='SlideWalkthroughPage';
        }
      });

    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot('LoginPage');
      this.storage.remove('loggedIn');
    })
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=="Logout"){
      this.storage.remove('loggedIn');
      this.logout();
    }
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  rightMenuClick(item) {
    this.rightMenuItems.map(menuItem => menuItem.active = false);
    item.active = true;
  }
}
