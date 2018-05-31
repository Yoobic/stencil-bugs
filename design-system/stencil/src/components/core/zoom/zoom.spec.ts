import { TestWindow } from '@stencil/core/testing';
import { YooZoomComponent } from './zoom';

describe('ZoomComponent', () => {
    it('should build', () => {
        expect(new YooZoomComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooZoomComponent],
                html: '<yoo-zoom></yoo-zoom>'
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