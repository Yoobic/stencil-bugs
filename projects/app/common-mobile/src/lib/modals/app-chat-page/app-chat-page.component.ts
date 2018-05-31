import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppChatBasePageComponent } from '@app/common-base';

@Component({
    selector: 'app-chat-page',
    templateUrl: './app-chat-page.component.html',
    styleUrls: ['./app-chat-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppChatPageComponent extends AppChatBasePageComponent {

}
