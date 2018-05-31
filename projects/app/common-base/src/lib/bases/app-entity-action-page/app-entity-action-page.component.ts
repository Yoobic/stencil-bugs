import { Injectable, OnInit, Input } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { Activity } from '@shared/data-core';
import { IEntity } from '@shared/interfaces';

@Injectable()
export class EntityActionPageBaseComponent extends BasePageBaseComponent implements OnInit {
    @Input() entity: IEntity;
    @Input() action: string;
    @Input() actionName: string;

    protected activity: any;

    initExtraProviders() {
        super.initExtraProviders();
        this.activity = this.injector.get<Activity>(Activity);
    }

    ngOnInit() {
        if (this.entity && this.action && this.activity) {
            this.aggregateOptions = this.activity.getActionAggregateOptions();
            this.filters = this.activity.getActionFilter(this.entity._id, this.action);
            this.mapTransform = this.activity.getUserTransform();
        }
    }

}
