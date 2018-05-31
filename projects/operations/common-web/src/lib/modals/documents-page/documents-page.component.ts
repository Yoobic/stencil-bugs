import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentsPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class DocumentsPageComponent extends DocumentsPageBaseComponent {

}
