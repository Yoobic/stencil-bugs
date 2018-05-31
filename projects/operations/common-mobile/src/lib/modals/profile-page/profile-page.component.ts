import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProfilePageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent extends ProfilePageBaseComponent {

}