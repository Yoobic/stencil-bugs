import { ChartDefinition } from './chart-definition.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: ChartDefinition', () => {
    it('should create an entity', () => {
        let entity = new ChartDefinition();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('ChartDefinition');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});