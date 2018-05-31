import { Group } from './group.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Group', () => {
    it('should create an entity', () => {
        let entity = new Group();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Group');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});