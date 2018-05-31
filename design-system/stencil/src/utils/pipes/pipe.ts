import { CurrencyPipe } from './currency/currency.pipe';
import { DateFormatPipe } from './date-format/date-format.pipe';
import { DecimalPipe } from './decimal/decimal.pipe';
import { FileSizePipe } from './file-size/file-size.pipe';
import { NumberPipe } from './number/number.pipe';
import { OrderByPipe } from './order-by/order-by.pipe';
import { RoundPipe } from './round/round.pipe';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';
import { TimerPipe } from './timer/timer.pipe';
import { UserInitialPipe } from './user-initial/user-initial';

export const pipes = {
    currency: new CurrencyPipe(),
    dateFormat: new DateFormatPipe(),
    decimal: new DecimalPipe(),
    fileSize: new FileSizePipe(),
    number: new NumberPipe(),
    orderBy: new OrderByPipe(),
    round: new RoundPipe(),
    timeAgo: new TimeAgoPipe(),
    timer: new TimerPipe(),
    userInitial: new UserInitialPipe()
};