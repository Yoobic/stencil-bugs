import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TaskCreatePageBaseComponent } from '@operations/common-base';

@Component({
  selector: 'task-create-page',
  templateUrl: './task-create-page.component.html',
  styleUrls: ['./task-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'ion-page' }
})
export class TaskCreatePageComponent extends TaskCreatePageBaseComponent {

}
