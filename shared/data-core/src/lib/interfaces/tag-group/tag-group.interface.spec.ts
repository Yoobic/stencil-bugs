import { TagGroup } from './tag-group.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: TagGroup', () => {
    it('should create an entity', () => {
        let entity = new TagGroup();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('TagGroup');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});