import { TestWindow } from '@stencil/core/testing';
import { YooChatCreateComponent } from './chat-create';

describe('ChatCreateComponent', () => {
    it('should build', () => {
        expect(new YooChatCreateComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooChatCreateComponent],
                html: '<yoo-chat-create></yoo-chat-create>'
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