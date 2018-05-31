/*! Built with http://stenciljs.com */
const { h } = window.DesignSystem;

import { a as moment } from './chunk-b8bd1aac.js';
import { g as orderBy } from './chunk-cdfb4b5d.js';

class Pipe {
    transform(value, options = {}) {
        return null;
    }
}

class CurrencyPipe extends Pipe {
    transform(value, options = 'EUR') {
        return value.toString() + ' ' + options;
    }
}

class DateFormatPipe extends Pipe {
    transform(value, options = '') {
        if (value) {
            let isTime = /^\d\d:\d\d/.test(value.toString());
            if (options === 'fromNow') {
                return moment(value, isTime ? 'HH:mm' : '').fromNow();
            }
            return moment(value, isTime ? 'HH:mm' : '').format(options);
        }
        return value;
    }
}

class DecimalPipe extends Pipe {
    transform(value) {
        return value.toString();
    }
}

class FileSizePipe extends Pipe {
    transform(value) {
        if (!isFinite(value)) { //isNaN(parseFloat(value)) ||
            return '';
        }
        let units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        let calc = Math.floor(Math.log(value) / Math.log(1024));
        let size = value / Math.pow(1024, Math.floor(calc));
        return size.toFixed(1) + ' ' + units[calc];
    }
}

class NumberPipe extends Pipe {
    transform(value, options) {
        if (Math.abs(value) <= 999) {
            return value.toString();
        }
        else if (Math.abs(value) <= 999999) {
            return Math.round(value / 1000) + ' K';
        }
        else if (Math.abs(value) <= 999999999) {
            return Math.round(value / 1000000) + ' M';
        }
        else {
            return Math.round(value / 1000000) + ' M';
        }
    }
}

class OrderByPipe extends Pipe {
    transform(value, options) {
        let keys = options.map((k) => k.replace('-', ''));
        let orders = options.map((k) => k.indexOf('-') === 0 ? 'desc' : 'asc');
        return orderBy(value, keys, orders);
    }
}

class RoundPipe extends Pipe {
    transform(value) {
        return Math.round(value);
    }
}

class TimeAgoPipe extends Pipe {
    transform(value) {
        if (value) {
            return moment(value).fromNow();
        }
        return value;
    }
}

class TimerPipe {
    transform(value, options = 'seconds') {
        let precision = options;
        return this.secondParser(value, precision);
    }
    secondParser(time, precision = 'seconds') {
        let seconds = time % 60;
        let mins = (time - seconds) / 60;
        let minutes = mins % 60;
        let hours = (mins - minutes) / 60;
        let displaySeconds = this.padder(seconds);
        let displayMinutes = this.padder(minutes);
        let displayHours = this.padder(hours);
        switch (precision) {
            case 'seconds': return displayHours + ':' + displayMinutes + ':' + displaySeconds;
            case 'minutes': return displayHours + ':' + displayMinutes;
            case 'hours': return displayHours;
        }
    }
    padder(num) {
        let numberString = num.toString();
        if (numberString.length === 1) {
            numberString = '0' + numberString;
        }
        return numberString;
    }
}

class UserInitialPipe {
    transform(user) {
        if (user) {
            let initials = '';
            if (typeof user !== 'undefined' && user) {
                if (user.firstName && user.lastName) {
                    initials += user.firstName.toString().substring(0, 1);
                    initials += user.lastName.toString().substring(0, 1);
                }
                else if (user.username) {
                    initials = user.username.toString().substring(0, 2);
                }
            }
            return initials;
        }
        return '';
    }
}

const pipes = {
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

export { pipes as a };
