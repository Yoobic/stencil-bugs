import { Product } from './product.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: product', () => {
    it('should create an entity', () => {
        let entity = new Product();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Product');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});