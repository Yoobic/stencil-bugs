import { FileSizePipe } from './file-size.pipe';

describe('Pipe: FileSizePipe', () => {

    let fileSizePipe: FileSizePipe = new FileSizePipe();
    it('should transform input number to a human readable file size using the most suitable unit', () => {
        expect(fileSizePipe.transform(100000)).toEqual('97.7 kB');
        expect(fileSizePipe.transform(506486)).toEqual('494.6 kB');
        expect(fileSizePipe.transform(506486000)).toEqual('483.0 MB');
        expect(fileSizePipe.transform(984984948949)).toEqual('917.3 GB');
        expect(fileSizePipe.transform(98498494894984)).toEqual('89.6 TB');
        expect(fileSizePipe.transform(9849849489498400)).toEqual('8.7 PB');
    });
    it('should handle invalid inputs gracefully', () => {
        expect(fileSizePipe.transform('string')).toEqual('');
    });
});