import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the PopupMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popup-menu',
  templateUrl: 'popup-menu.html'
})
export class PopupMenuComponent {

  openMenu = false;

  constructor(public modalCtrl: ModalController) {
    
  }

openAddItemModal(){
  this.openModal('PopupModalPage');
  this.togglePopupMenu();
}
openModal(pageName) {
this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal',enableBackdropDismiss: true })
  .present();
}

togglePopupMenu() {
  return this.openMenu = !this.openMenu;
}

}
