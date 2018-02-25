import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams,MenuController} from 'ionic-angular';
import {SuperTabs,SuperTabsController} from "ionic2-super-tabs";

@IonicPage({
  segment: 'expense/:type'
})
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  GroupExpensePage: any = 'GroupExpensePage';
  PersonalExpensePage: any = 'PersonalExpensePage';
  page3: any = 'ReportsPage';
  page4: any = 'ReferralPage';
  showIcons: boolean = false;
  showTitles: boolean = true;
  pageTitle: string = 'Page1Page';

  constructor(public menu: MenuController,public navCtrl: NavController, private navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    
    this.menu.enable(true);
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
