import { Tableau } from './tableau.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: tableau', () => {
    it('should create an entity', () => {
        let entity = new Tableau();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('Tableau');
        expect(model).toBeTruthy();
        expect(model).toMatchSnapshot();
    });
});