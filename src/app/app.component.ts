import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Subject';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  activePage = new Subject();
  pages: Array<{ title: string, component: any, active: boolean, icon: string}>;
  state: any;
  placeholder = 'assets/img/avatar/girl-avatar.png';
  chosenPicture: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashscreen: SplashScreen,
    public global: AppState,
    public menu: MenuController,
    public app: App
  ) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'Reports', component: 'ReportsPage', active: false, icon: 'analytics' },
      { title: 'Invite', component: 'ReferralPage', active: false, icon: 'basket' },
      { title: 'Logout', component: 'SignupotpPage', active: false, icon: 'power' },
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
    if(localStorage.getItem('walkthrough')){

      if(localStorage.getItem('userData')){
        var user=JSON.parse(localStorage.getItem('userData')).userData;
        if(user.otp_verified=="0"){
          this.nav.push('VerifyotpPage',{mobile: user.mobile,code:user.code});
        }else{
          this.rootPage='HomePage';
        }
      }else{
         this.rootPage='SignupotpPage';
      }

    }else{
      this.rootPage='SlideWalkthroughPage';
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      this.statusBar.styleDefault();
      this.splashscreen.hide();
      this.menu.enable(true);
    });
  }

  openPage(page) {
    if(page.title=="Logout"){
      this.logout();
    }
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  backToWelcome(){
    const root = this.app.getRootNav();
     root.popToRoot();
   }

  logout(){
    localStorage.clear();
    this.menu.enable(false);
     setTimeout(()=> this.backToWelcome(), 1000);
    
  }
}
