import { Operation } from './operation.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: operation', () => {
    it('should create an entity', () => {
        let entity = new Operation();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Operation');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});