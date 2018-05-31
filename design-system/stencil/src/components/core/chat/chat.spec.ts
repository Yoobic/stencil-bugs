import { TestWindow } from '@stencil/core/testing';
import { YooChatComponent } from './chat';

describe('YooChatComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooChatComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it ('Should render', async () => {
            let element = await window.load({
                components: [YooChatComponent],
                html: '<yoo-chat></yoo-chat>'
            });
            expect(element).toBeTruthy();
            expect(element).toMatchSnapshot();
        });

        it ('Should render with a heading', async () => {
            let element = await window.load({
                components: [YooChatComponent],
                html: '<yoo-chat heading="Chat Heading"></yoo-chat>'
            });
            expect(element).toBeTruthy();
            expect(element).toMatchSnapshot();
        });

        it ('Should render with messages', async () => {
            let element = await window.load({
                components: [YooChatComponent],
                html: '<yoo-chat heading="Chat Heading"></yoo-chat>'
            });
            expect(element.messages).toEqual([]);
            element.messages = [{content: 'First message', author: 'Seb', time: '8:47am'},
                {content: '2nd message: It seems to work fine but I\'m sure there is a bug somewhere !',
                    author: 'Seb'},
                {content: 'Third message, it is a very very very very long message. Not so long after all !',
                    author: 'Mike', isAlternate: true}];
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should render with images inside the messages', async () => {
            let element = await window.load({
                components: [YooChatComponent],
                html: '<yoo-chat heading="Chat Heading"></yoo-chat>'
            });
            expect(element.messages).toEqual([]);
            element.messages = [{content: 'First message', author: 'Seb', time: '8:47am'},
                {content: '2nd message: It seems to work fine but I\'m sure there is a bug somewhere !',
                    author: 'Seb', img: './assets/grid/empty-state-1.svg'},
                {content: 'Third message, it is a very very very very long message. Not so long after all !',
                    author: 'Mike', isAlternate: true, img: './assets/grid/empty-state-1.svg'}];
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Re-rendering', () => {
        it('Should re render when heading is updated', async () => {
            let element = await window.load({
                components: [YooChatComponent],
                html: '<yoo-chat heading="Chat Title"></yoo-chat>'
            });
            expect(element.heading).toEqual('Chat Title');
            element.heading = 'New Title';
            await window.flush();
            expect(element.heading).toEqual('New Title');
            expect(element).toMatchSnapshot();
        });
    });
});
