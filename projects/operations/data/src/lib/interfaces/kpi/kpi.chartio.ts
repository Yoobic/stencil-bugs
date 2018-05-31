import { ModelExtended, Editable, ChartDefinition } from '@shared/data-core';
import { Translate } from '@shared/translate';
import { FormFieldType } from '@shared/interfaces';

import { BaseKpi } from './kpi.base';
import { assign } from 'lodash-es';

@ModelExtended({ baseClass: 'BaseKpi', extendedClass: 'ChartIOKpi' })
export class ChartIOKpi extends BaseKpi {

    @Editable('ChartIOKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.text })
    title: string;

    @Editable('ChartIOKpi', { tab: 'GENERAL', tabIndex: 1, required: false, type: FormFieldType.textarea })
    description: string;

    @Editable('ChartIOKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.text })
    dashboardId: string;

    @Editable('ChartIOKpi', { tab: 'GENERAL', tabIndex: 1, required: true, type: FormFieldType.autocomplete, values: ['Tableau', 'Chart.io'] })
    provider: string;

    public static getChartDefinition(kpi: ChartIOKpi, cd: ChartDefinition, translate: Translate) {
        BaseKpi.getChartDefinition(kpi, cd, translate);
        assign(cd, {
            showAs: 'chartio'
        });
        cd.title = translate.polyglot(cd.title);
    }

    public static getAggregate(kpi: ChartIOKpi, translate: Translate, cloudinaryPipe: any) {
        return null;
    }

}