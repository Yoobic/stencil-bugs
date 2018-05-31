import { Dashboard } from './dashboard.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Dashboard', () => {
    it('should create an entity', () => {
        let entity = new Dashboard();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Dashboard');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});