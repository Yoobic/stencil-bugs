import { Condition, ConditionalField } from './condition.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Condition', () => {
    it('should create a condition entity', () => {
        let entity = new Condition();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Condition');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
    it('should create a conditional field entity', () => {
        let entity = new ConditionalField();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('ConditionalField');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});
