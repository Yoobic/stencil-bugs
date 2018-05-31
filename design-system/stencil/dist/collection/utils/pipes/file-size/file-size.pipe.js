import { Pipe } from '../pipe';
export class FileSizePipe extends Pipe {
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
export const fileSizePipe = new FileSizePipe();
