import { File } from './file.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: File', () => {
    it('should create an entity', () => {
        let entity = new File();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('File');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});