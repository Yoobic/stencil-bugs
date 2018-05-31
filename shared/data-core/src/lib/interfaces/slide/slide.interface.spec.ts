import { Slide } from './slide.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: slide', () => {
    it('should create an entity', () => {
        let entity = new Slide();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Slide');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});