import { ChartDefinition } from '../chart-definition/chart-definition.interface';

import { Model } from '../../decorators/model/model.decorator';
import { Searchable } from '../../decorators/searchable/searchable.decorator';
import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IDashboard } from '@shared/interfaces';

@Model({
    className: 'Dashboard',
    collectionName: 'dashboards',
    fields: ['*'],
    include: []
})

export class Dashboard extends IDashboard {

    @Editable('Dashboard', { required: true, type: FormFieldType.text })
    @Searchable('Dashboard') title: string;

    @Editable('Dashboard', { required: false, type: FormFieldType.textarea })
    @Searchable('Dashboard') description: string;

    tabs: Array<{ title: string, items: Array<{ col: number; row: number; sizex: number; sizey: number; definition: ChartDefinition }> }>;

}
