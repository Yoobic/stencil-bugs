import { Component } from '@angular/core';
import { ExampleModalComponent } from '../../components/example-modal/example-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(private modalCtrl: ModalController) {

  }

  data = {
    name: 'Miguel',
    surname: 'Marin'
  };

  openModal() {
    return new Promise((resolve, reject) => {

  this.modalCtrl.create({component: ExampleModalComponent, componentProps: {... this.data} }).then(modal => {
      modal.onDidDismiss((ret) => {
        resolve(ret);
      });
      modal.present();
    });
    });
  }
}
