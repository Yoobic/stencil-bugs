import { LocationType } from './location-type.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: LocationType', () => {
    it('should create an entity', () => {
        let entity = new LocationType();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('LocationType');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});