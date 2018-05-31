import { moment } from '@shared/interfaces';


export function getStartAndEndDates(timescale, endDate?: Date | string, amount?: number, notsliding?: boolean) {
    let lastDate = endDate || new Date();
    amount = amount || 7;
    let period = 'days';
    let startof = 'day';
    switch (timescale) {
        case 'last30days':
            amount = 30;
            period = 'days';
            break;
        case 'last90days':
            amount = 90;
            period = 'days';
            break;
        case 'last365days':
            amount = 365;
            period = 'days';
            break;
        case 'lastweek':
            amount = 0;
            period = 'weeks';
            break;
        case 'lastmonth':
            amount = 0;
            period = 'months';
            startof = 'month';
            break;
        case 'lastquarter':
            amount = 2;
            period = 'months';
            startof = 'month';
            break;
        case 'lastyear':
            amount = 0;
            period = 'years';
            startof = 'year';
            break;
        case 'last7days':
            amount = 7;
            period = 'days';
            startof = 'day';
            break;

        default:
            if (notsliding) {
                amount = amount ? amount - 1 : 0;
                period = timescale;
                startof = timescale;
            } else {
                amount = amount || 1;
                period = timescale;
                startof = 'day';
            }

            break;
    }
    //use .utc() to get the startOf with no offset issues
    return [moment(lastDate).utc().add(<any>-amount, <any>period).startOf(<any>startof).toISOString(), moment(lastDate).toISOString()];
}
