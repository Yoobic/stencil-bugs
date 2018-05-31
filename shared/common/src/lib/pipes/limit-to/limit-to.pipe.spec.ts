import { LimitToPipe } from './limit-to.pipe';

describe('Pipe: LimitToPipe', () => {

    let limitToPipe: LimitToPipe = new LimitToPipe();

    it('should limit a string to a certain number of characters', () => {
        expect(limitToPipe.transform('I am a sentence that needs to be shortened', 15))
            .toEqual('I am a sentence');
    });
    it('should throw an error if no second argument is given', () => {
        try {
            limitToPipe.transform('Sentence');
        } catch (error) {
            expect(error.message).toEqual('limitTo pipe requires one argument');
        }
    });
    it('should return and emptry array if no first argument is given', () => {
        expect(limitToPipe.transform()).toEqual([]);
    });
});