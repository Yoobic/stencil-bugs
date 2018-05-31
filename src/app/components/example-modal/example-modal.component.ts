import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExampleModalBaseComponent } from '../../bases/example-modal-base';

@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.component.html',
  styleUrls: ['./example-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class ExampleModalComponent extends ExampleModalBaseComponent {


  isShown: boolean;
  constructor(private modalCtrl: ModalController) {
    super();
    this.isShown = true;
  }

  closeModal() {
      this.modalCtrl.dismiss();
  }
}

