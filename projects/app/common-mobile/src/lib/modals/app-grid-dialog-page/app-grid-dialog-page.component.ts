import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppGridDialogBasePageComponent } from '@app/common-base';

@Component({
    selector: 'app-grid-dialog-page',
    templateUrl: './app-grid-dialog-page.component.html',
    styleUrls: ['./app-grid-dialog-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppGridDialogPageComponent extends AppGridDialogBasePageComponent {

}
