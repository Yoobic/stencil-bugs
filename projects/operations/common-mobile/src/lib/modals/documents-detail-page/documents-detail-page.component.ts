import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocumentsDetailPageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'documents-detail-page',
  templateUrl: './documents-detail-page.component.html',
  styleUrls: ['./documents-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsDetailPageComponent extends DocumentsDetailPageBaseComponent {

}
