import { TodoTask, TodoTaskSimple } from './todo.interface';
import { Models } from '../../../public_api';

describe('shared: data-core: interfaces: TodoTask', () => {
    it('should create a todo task entity', () => {
        let entity = new TodoTask();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('TodoTask');
        expect(model).toBeTruthy();
        let modelCopy = {...model};
        modelCopy['_formFields'][2].minDate = '2000-01-01T00:00:00.000Z';
        expect(modelCopy).toMatchSnapshot();
    });
    it('should create a TodoTaskSimple entity', () => {
        let entity = new TodoTaskSimple();
        expect(entity._id).toBeUndefined();
        let model = Models.getModel('TodoTaskSimple');
        expect(model).toBeTruthy();
        let modelCopy = {...model};
        modelCopy['_formFields'][2].minDate = '2000-01-01T00:00:00.000Z';
        expect(modelCopy).toMatchSnapshot();
    });
});
