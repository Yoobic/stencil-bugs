import { TestWindow } from '@stencil/core/testing';
import { YooServiceCreateComponent } from './service-create';

describe('ServiceCreateComponent', () => {
    it('should build', () => {
        expect(new YooServiceCreateComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooServiceCreateComponent],
                html: '<yoo-service-create></yoo-service-create>'
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