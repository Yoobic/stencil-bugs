import { Editable } from '../../decorators/editable/editable.decorator';
import { FormFieldType, IKpi , Filters, IDatesRange } from '@shared/interfaces';
import { getStartAndEndDates as getStartAndEndDatesCore } from '../dates/dates.interface';
import { MissionDescription } from '../mission-description/mission-description.interface';
import { ChartDefinition } from '../chart-definition/chart-definition.interface';
import { Model } from '../../decorators/model/model.decorator';

import { Colors } from '@shared/common';
import { Translate } from '@shared/translate';

import { merge, isNaN, cloneDeep } from 'lodash-es';

@Model({
    className: 'BaseKpi'
})
export class BaseKpi extends IKpi {

    @Editable('BaseKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.number, advanced: true })
    pointPadding: boolean;

    @Editable('BaseKpi', { tabIndex: 2, tab: 'ADVANCED', type: FormFieldType.number, advanced: true, min: 1 })
    numberPrecision: number;

    dates: IDatesRange;

    public static getChartDefinition(kpi: any, cd: ChartDefinition, translate: Translate) {
        merge(cd, {
            description: kpi.description,
            title: kpi.title,
            showAs: kpi.showAs || cd.showAs || 'chart',
            showValues: kpi.showValues,
            showLegend: kpi.showLegend === false ? false : true
        });
    }

    public static getDates(kpi: BaseKpi): { startDate?: string; endDate?: string } {
        let retVal: any = {};
        if (kpi.dates) {
            if (kpi.dates.mode === 'calendar') {
                if (kpi.dates.startDate) {
                    retVal.startDate = kpi.dates.startDate;
                }
                if (kpi.dates.endDate) {
                    retVal.endDate = kpi.dates.endDate;
                }
            }
            if (kpi.dates.mode === 'dynamic') {
                let dates = this.getStartAndEndDates(kpi.dates.timescale, null, kpi.dates.amount, kpi.dates.notsliding);
                retVal.startDate = dates[0];
                retVal.endDate = dates[1];
            }
        }
        return retVal;
    }

    public static getStartAndEndDates(timescale, endDate?: Date | string, amount?: number, notsliding?: boolean) {
        return getStartAndEndDatesCore(timescale, endDate, amount, notsliding);
    }

    public static fixDates(cd: ChartDefinition, date: string) {
        let retVal;
        if (!date) {
            return new Date().getTime();
        }
        if (cd.dateGrouping === 'week' || cd.kpiFormValues && ((cd.kpiFormValues.groupBySlider - 0) === 1)) {
            let y = <any>date.split('-')[0];
            let w = <any>date.split('-')[1];
            // MongoDB week begins on Sundays and days preceding the first Sudnay of the year are in Week 0;
            // So,  weekStartDay = days in Week 0 + first day of the week number
            let yearStartDay = new Date(y, 0, 0).getDay();
            let daysInWeek0 = yearStartDay === 0 ? 0 : 7 - yearStartDay;
            let d = w === '00' ? 0 : daysInWeek0 + (w - 1) * 7;
            let weekStart = new Date(y, 0, d);

            retVal = weekStart.getTime();
            //retVal = moment('2011-01-01').year(y).isoWeek(w).toDate().getTime(); //.startOf('day')
        } else {
            retVal = new Date(date).getTime();
        }
        return retVal;
    }

    public static getColor(value) {
        let color = Colors.dark;
        if (!isNaN(value)) {
            if (value < 33) {
                color = Colors.assertive;
            } else if (value < 75) {
                color = Colors.energized;
            } else if (value >= 75) {
                color = Colors.balanced;
            }
        }
        return color;
    }

    public static setDateFilters(filters: Filters, dates: { startDate?: string; endDate?: string }, field = 'finishedDate', allowNotExits = true) {
        if (dates.startDate || dates.endDate) {
            let filter: any;
            if (allowNotExits) {
                filters.push(cloneDeep(filters[0]));
                filter = <any>{ operator: { _id: 'exists' }, value: false };
                filter.field = field;
                filters[1].push(filter);
            }
            if (dates.startDate) {
                filter = <any>{ operator: { _id: 'gte' }, value: dates.startDate };
                filter.field = field;
                filters[0].push(filter);
            }
            if (dates.endDate) {
                filter = <any>{ operator: { _id: 'lt' }, value: dates.endDate };
                filter.field = field;
                filters[0].push(filter);
            }
        }
    }

    public static setLocationTagsFilters(filters: Filters, locationTags: Array<string>) {
        if (locationTags && locationTags.length) {
            filters[0].push({ field: 'tags', collectionName: 'locations', operator: { _id: 'inq' }, value: locationTags, type: 'autocomplete', subQuery: { field: 'locationRef', values: '_id' } });
        }
    }

    public static setUserTagsFilters(filters: Filters, locationTags: Array<string>) {
        if (locationTags && locationTags.length) {
            filters[0].push({ field: 'tags', collectionName: 'user', operator: { _id: 'inq' }, value: locationTags, type: 'autocomplete', subQuery: { field: 'ownerRef', values: '_id' } });
        }
    }

    public static setCampaignFilters(campaigns: Array<MissionDescription>, campaignTags: Array<string>, filters: Filters, missionType: string) {
        if (campaigns && campaigns.length > 0) {
            filters[0].unshift({ field: 'descriptionRef', operator: { _id: 'inq' }, value: campaigns.map(c => c._id) });
        } else if (campaignTags && campaignTags.length > 0) {
            filters[0].push({ field: 'tags', collectionName: 'missiondescriptions', operator: { _id: 'inq' }, value: campaignTags, type: 'autocomplete', subQuery: { field: 'descriptionRef', values: '_id' } });
        }
        if (missionType) {
            filters[0].push({ field: 'type', operator: { _id: 'inq' }, value: [missionType] });
        }
    }

    public static getDateFormat(groupBy) {
        let format = '%Y-%m-%d';
        if (groupBy && groupBy.toString) {
            switch (groupBy.toString()) {
                case '1':
                case 'week':
                case 1:
                    format = '%Y-%V';
                    break;

                case '2':
                case 'month':
                case 2:
                    format = '%Y-%m';
                    break;

                case '3':
                case 'quarter':
                case 3:
                case '4':
                case 'year':
                case 4:
                    format = '%Y';
                    break;
            }
        }
        return format;
    }

    public static getDateFormatMoment(groupBy) {
        let format = '';
        if (groupBy && groupBy.toString) {
            switch (groupBy.toString()) {
                case '1':
                case 'week':
                case 1:
                    format = 'YYYY-WW';
                    break;

                case '2':
                case 'month':
                case 2:
                    format = 'YYYY-MM';
                    break;

                case '3':
                case 'quarter':
                case 3:
                case '4':
                case 'year':
                case 4:
                    format = 'YYYY';
                    break;
            }
        }
        return format;
    }
}