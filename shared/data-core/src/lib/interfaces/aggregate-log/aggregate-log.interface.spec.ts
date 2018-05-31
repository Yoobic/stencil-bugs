import { AggregateLog } from './aggregate-log.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: AggregateLog', () => {
    it('should create an entity', () => {
        let entity = new AggregateLog();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('AggregateLog');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});