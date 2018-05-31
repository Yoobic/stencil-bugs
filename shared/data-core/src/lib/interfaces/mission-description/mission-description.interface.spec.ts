import { MissionDescription } from './mission-description.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: MissionDescription', () => {
    it('should create an entity', () => {
        let entity = new MissionDescription();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('MissionDescription');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});