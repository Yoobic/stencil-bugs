import { Currency } from './currency.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Currency', () => {
    it('should create an entity', () => {
        let entity = new Currency();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Currency');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});