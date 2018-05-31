import { IMapping } from './mapping.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Mapping', () => {
    it('should create an entity', () => {
        let entity = new IMapping();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('IMapping');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});