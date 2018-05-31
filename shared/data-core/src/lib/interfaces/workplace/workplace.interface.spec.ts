import { WorkplaceGroups, WorkplacePost } from './workplace.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: workplace', () => {
    it('should create a WorkplaceGroups entity', () => {
        let entity = new WorkplaceGroups();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('WorkplaceGroups');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
    it('should create a WorkplacePost entity', () => {
        let entity = new WorkplacePost();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('WorkplacePost');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});
