import { TestWindow } from '@stencil/core/testing';
import { YooTaskCreateComponent } from './task-create';

describe('TaskCreateComponent', () => {
    it('should build', () => {
        expect(new YooTaskCreateComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooTaskCreateComponent],
                html: '<yoo-task-create></yoo-task-create>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window;
        beforeEach( async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });
    });
});