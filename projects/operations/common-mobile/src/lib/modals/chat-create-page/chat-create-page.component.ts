import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChatCreatePageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'chat-create-page',
  templateUrl: './chat-create-page.component.html',
  styleUrls: ['./chat-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class ChatCreatePageComponent extends ChatCreatePageBaseComponent {

}
