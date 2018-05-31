import { pipes } from '../pipe';

describe('Round Pipe', () => {
    it('Should return the value rounded', async () => {
        expect(pipes.round.transform(3.678)).toEqual(4);
        expect(pipes.round.transform(4.278)).toEqual(4);
    });
});