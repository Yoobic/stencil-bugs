import { Algorithm } from './algorithm.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Algorithm', () => {
    it('should create an entity', () => {
        let entity = new Algorithm();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Algorithm');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});