import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppFormDynamicBasePageComponent } from '@app/common-base';

@Component({
    selector: 'app-form-dynamic-page',
    templateUrl: './app-form-dynamic-page.component.html',
    styleUrls: ['./app-form-dynamic-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFormDynamicPageComponent extends AppFormDynamicBasePageComponent {

}