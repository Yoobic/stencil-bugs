import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { IProfileConfig } from '@shared/interfaces';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppProfileComponent {
  @Input() config: IProfileConfig;

  @Output() loggedOut = new EventEmitter<any>();

  public isLoading: boolean;

  constructor(protected utils: UtilsService, protected cd: ChangeDetectorRef) { }

  onLogout() {
    this.isLoading = true;
    this.cd.markForCheck();

    this.utils.logout().then(retVal => {
      if (retVal) {
        this.loggedOut.emit();
      }
      this.isLoading = false;
      this.cd.markForCheck();
    });
  }

  onItemClick(ev) {
    if (ev && ev.detail && ev.detail.handler) {
      ev.detail.handler();
    }
  }

  onProfileEdit() {
    this.utils.showProfileEdit();
  }
}
