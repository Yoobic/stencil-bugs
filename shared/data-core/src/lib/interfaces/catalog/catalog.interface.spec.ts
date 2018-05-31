import { Catalog } from './catalog.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Catalog', () => {
    it('should create an entity', () => {
        let entity = new Catalog();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Catalog');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});