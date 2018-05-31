import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasePageBaseComponent } from '../../bases/base-page/base-page.component';

@Component({
    selector: 'app-result-dialog-page',
    templateUrl: './app-result-dialog-page.component.html',
    styleUrls: ['./app-result-dialog-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppResultDialogPageComponent extends BasePageBaseComponent {

    @Input() heading: string;
    @Input() subheading: string;
    @Input() success: boolean;
    @Input() buttonText: string;

    onClose() {
        this.closeModal();
    }
}
