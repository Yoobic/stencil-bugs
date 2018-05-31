import { Backup } from './backup.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Backup', () => {
    it('should create an entity', () => {
        let entity = new Backup();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Backup');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});