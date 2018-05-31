import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRootBaseComponent } from '@app/common-base';

@Component({
    selector: 'app-root',
    styleUrls: ['./app-root.component.scss'],
    templateUrl: './app-root.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppRootComponent extends AppRootBaseComponent {

}
