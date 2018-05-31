import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasePageBaseComponent } from '@app/common-base';

@Component({
  selector: 'contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsPageComponent extends BasePageBaseComponent {

}
