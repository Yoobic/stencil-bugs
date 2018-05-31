import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppWhatsNewBasePageComponent } from '@app/common-base';

@Component({
    selector: 'app-whatsnew-page',
    templateUrl: './app-whatsnew-page.component.html',
    styleUrls: ['./app-whatsnew-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWhatsNewPageComponent extends AppWhatsNewBasePageComponent {

}
