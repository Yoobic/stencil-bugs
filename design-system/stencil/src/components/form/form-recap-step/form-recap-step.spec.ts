import { TestWindow } from '@stencil/core/testing';
import { YooFormRecapStepComponent } from './form-recap-step';

describe('FormRecapStepComponent', () => {
    it('should build', () => {
        expect(new YooFormRecapStepComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFormRecapStepComponent],
                html: '<yoo-form-recap-step></yoo-form-recap-step>'
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