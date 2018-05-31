import { User } from './user.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: User', () => {
    it('should create an entity', () => {
        let entity = new User();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('User');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});