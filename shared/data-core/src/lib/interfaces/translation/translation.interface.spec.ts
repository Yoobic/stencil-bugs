import { Translation } from './translation.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Translation', () => {
    it('should create an entity', () => {
        let entity = new Translation();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Translation');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});