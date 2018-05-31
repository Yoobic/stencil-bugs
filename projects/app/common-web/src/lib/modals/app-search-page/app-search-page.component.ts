import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppSearchPageBaseComponent } from '@app/common-base';

@Component({
    selector: 'app-search-page',
    templateUrl: './app-search-page.component.html',
    styleUrls: ['./app-search-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSearchPageComponent extends AppSearchPageBaseComponent {

}