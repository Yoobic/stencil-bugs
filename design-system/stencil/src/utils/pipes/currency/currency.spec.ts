import { pipes } from '../pipe';

describe('Currency Pipe', () => {
    it('Should have EUR as default', async () => {
        expect(pipes.currency.transform(3)).toEqual('3 EUR');
    });

    it('Should work with a custom tag', async () => {
        expect(pipes.currency.transform(6, '$')).toEqual('6 $');
    });
});