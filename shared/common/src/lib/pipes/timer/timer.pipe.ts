import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timer' })
export class TimerPipe implements PipeTransform {
    transform(value: number, ...args: string[]): any {
        let precision = args[0];
        return this.secondParser(value, precision);
    }

    secondParser(time: number, precision = 'seconds') {
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

    padder(num: number) {
        let numberString = num.toString();
        if (numberString.length === 1) {
            numberString = '0' + numberString;
        }
        return numberString;
    }
}