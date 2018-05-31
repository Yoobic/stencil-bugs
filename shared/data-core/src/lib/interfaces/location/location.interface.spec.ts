import { Location } from './location.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Location', () => {
    it('should create an entity', () => {
        let entity = new Location();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Location');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});