import { Tag } from './tag.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: tag', () => {
    it('should create an entity', () => {
        let entity = new Tag();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Tag');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});