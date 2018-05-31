import { pipes } from '../pipe';

describe('Pipe: FileSizePipe', () => {

    it('should transform input number to a human readable file size using the most suitable unit', () => {
        expect(pipes.fileSize.transform(100000)).toEqual('97.7 kB');
        expect(pipes.fileSize.transform(506486)).toEqual('494.6 kB');
        expect(pipes.fileSize.transform(506486000)).toEqual('483.0 MB');
        expect(pipes.fileSize.transform(984984948949)).toEqual('917.3 GB');
        expect(pipes.fileSize.transform(98498494894984)).toEqual('89.6 TB');
        expect(pipes.fileSize.transform(9849849489498400)).toEqual('8.7 PB');
    });
});