import { TestWindow } from '@stencil/core/testing';
import { YooFormDynamicComponent } from './form-dynamic';

describe('FormDynamicComponent', () => {
    it('should build', () => {
        expect(new YooFormDynamicComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFormDynamicComponent],
                html: '<yoo-form-dynamic></yoo-form-dynamic>'
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