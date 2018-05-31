import { TestWindow } from '@stencil/core/testing';
import { YooEventCreateComponent } from './event-create';

describe('EventCreateComponent', () => {
    it('should build', () => {
        expect(new YooEventCreateComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooEventCreateComponent],
                html: '<yoo-event-create></yoo-event-create>'
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