import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BasePageBaseComponent } from '@app/common-base';
// import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-resetpassword-page',
  templateUrl: './app-resetpassword-page.component.html',
  styleUrls: ['./app-resetpassword-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppResetPasswordPageComponent extends BasePageBaseComponent {

    public borderClass: string;
    public buttonClass: string;
    public subheading: string;

    onPasswordResetRequestSubmitted(event) {
      let email = event.detail.email;
      let isMagicLink = event.detail.isMagicLink;
      if (email) {
        this.authentication.passwordReset(email, isMagicLink).subscribe( retVal => {
          //TODO: send email sent notification and do error handling after design is set
        });
      }
      this.closeModal();
    }


}