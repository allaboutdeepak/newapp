import {Component, ViewChild} from '@angular/core';

import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SuperTabs,SuperTabsController} from "ionic2-super-tabs";
@IonicPage({
  segment: 'home/:type'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  page1: any = 'Page1Page';
  page2: any = 'Page2Page';
  page3: any = 'ReportsPage';
  page4: any = 'ReferralPage';
  showIcons: boolean = false;
  showTitles: boolean = true;
  pageTitle: string = 'Page1Page';

  constructor(public navCtrl: NavController, private navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    const type = navParams.get('type');
    switch (type) {
      case 'icons-only':
        this.showTitles = false;
        this.pageTitle += ' - Icons only';
        break;

      case 'titles-only':
        this.showIcons = false;
        this.pageTitle += ' - Titles only';
        break;
    }
  }

 

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
    this.pageTitle=tab.id;
  }
 

}
