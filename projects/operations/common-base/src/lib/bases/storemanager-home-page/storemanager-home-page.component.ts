import { Injectable, OnInit } from '@angular/core';

import { Filters } from '@shared/interfaces';
import { Mission } from '@operations/data';

import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class StoreManagerPageBaseComponent extends BasePageBaseComponent implements OnInit {
    public gridTodoFilters: Filters;
    public gridMemoFilters: Filters;
    public gridFollowUpFilters: Filters;

    public gridTodoHiddenFields: Array<string>;
    public gridMemoHiddenFields: Array<string>;
    public gridFollowUpHiddenFields: Array<string>;

    ngOnInit() {
        super.ngOnInit();
        (this.utils as UtilsService).missionFinished$.subscribe(() => {
            if (this.grid) {
                this.onPullToRefresh(this.grid, null);
            }
        });
        this.hiddenFields = ['language'];
        this.sorts = [{ colId: 'priority', sort: 'desc' }, { colId: 'title', sort: 'asc' }];
        this.sorts = [{ colId: '_ect', sort: 'desc' }];
        this.gridTodoFilters = [[
            ...(this.session.user.locationRef ? [{ field: 'locationRef', operator: { _id: 'inq' }, value: [this.session.user.locationRef] }] : []),
            { field: 'status', operator: { _id: 'nin' }, value: ['finished', 'booked'] },
            { field: 'type', operator: { _id: 'inq' }, value: ['mission'] }
        ], [
            ...(this.session.user.locationRef ? [{ field: 'locationRef', operator: { _id: 'inq' }, value: [this.session.user.locationRef] }] : []),
            { field: 'ownerRef', operator: { _id: 'inq' }, value: [this.session.userId] },
            { field: 'status', operator: { _id: 'nin' }, value: ['finished', 'booked'] },
            { field: 'type', operator: { _id: 'inq' }, value: ['todo'] }
        ], [
            { field: 'ownerRef', operator: { _id: 'inq' }, value: [this.session.userId] },
            { field: 'status', operator: { _id: 'inq' }, value: ['booked'] },
            { field: 'type', operator: { _id: 'inq' }, value: ['mission', 'todo'] }
        ]];
        this.gridTodoHiddenFields = ['locationRef', 'ownerRef', 'status', 'type'];

        this.gridMemoFilters = [[
            { field: 'ownerRef', operator: { _id: 'inq' }, value: [this.session.userId] },
            { field: 'status', operator: { _id: 'inq' }, value: ['booked', 'finished'] },
            { field: 'type', operator: { _id: 'inq' }, value: ['memo'] }
        ]];
        this.gridMemoHiddenFields = ['ownerRef', 'status', 'type'];

        this.gridFollowUpFilters = [[
            { field: 'creatorRef', operator: { _id: 'inq' }, value: [this.session.userId] },
            { field: 'ownerRef', operator: { _id: 'nin' }, value: [this.session.userId] },
            { field: 'status', operator: { _id: 'nin' }, value: ['finished'] },
            { field: 'type', operator: { _id: 'inq' }, value: ['service', 'todo'] }
        ]];
        this.gridFollowUpHiddenFields = ['creatorRef', 'ownerRef', 'status', 'type'];

    }

    onMissionSelect(mission: Mission) {
        if (mission) {
            (this.utils as UtilsService).showMissionDetail(mission);
        }
    }

}