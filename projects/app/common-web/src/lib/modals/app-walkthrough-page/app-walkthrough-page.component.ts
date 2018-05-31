import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppWalkthroughBasePageComponent } from '@app/common-base';

@Component({
    selector: 'app-walkthrough',
    templateUrl: './app-walkthrough-page.component.html',
    styleUrls: ['./app-walkthrough-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWalkthroughPageComponent extends AppWalkthroughBasePageComponent {

}
