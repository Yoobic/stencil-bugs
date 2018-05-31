import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppResetPasswordPageComponent } from '@app/common-web';


@Component({
    selector: 'login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

    public roles: Array<string> = [];
    public menuPath: string = 'menu';
    public resetPasswordModal: any = AppResetPasswordPageComponent;

}
