import { Notification } from './notification.interface';
import { Models, Editable } from '../../../public_api';

describe('shared: data-core: interfaces: notification', () => {
    it('should create an entity', () => {
        let entity = new Notification();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Notification');
        expect(model).toBeTruthy();
        let modelCopy = {...model};
        modelCopy['_formFields'][3].minDate = '2000-01-01T00:00:00.000Z';
        expect(modelCopy).toMatchSnapshot();
    });
});