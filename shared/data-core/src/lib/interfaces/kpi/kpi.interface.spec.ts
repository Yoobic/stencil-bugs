import { BaseKpi } from './kpi.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: Kpi', () => {
    it('should create an entity', () => {
        let entity = new BaseKpi();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('BaseKpi');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});