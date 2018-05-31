import { TestWindow } from '@stencil/core/testing';
import { YooInputBarComponent } from './input-bar';

describe('InputBarComponent', () => {
    it('should build', () => {
        expect(new YooInputBarComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooInputBarComponent],
                html: '<yoo-input-bar></yoo-input-bar>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it ('Should render with props', async () => {
            element.icon = 'yo-heart';
            element.value = 'bijour';
            element.placeholder = 'salut';
            element.actionText = 'Post';
            element.topIndication = 'Top Indication';
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it ('Should render with replyToUser', async () => {
            element.icon = 'yo-heart';
            element.value = 'bijour';
            element.placeholder = 'salut';
            element.actionText = 'Post';
            element.replyToUser = {firstName: 'JAck', lastName: 'Rob'};
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should not render actionIcon with text inside', async () => {
            element.icon = 'yo-heart';
            element.value = null;
            element.placeholder = 'salut';
            element.actionText = 'Post';
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window, element;
        beforeEach( async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
            element = await window.load({
                components: [YooInputBarComponent],
                html: '<yoo-input-bar></yoo-input-bar>'
            });
            element.icon = 'yo-heart';
            element.value = 'bijour';
            element.placeholder = 'salut';
            element.actionText = 'Post';
            await window.flush();
        });

        it('Should send an Event if icon is clicked', async () => {
            let button = element.querySelector('.capture-icon');
            window.document.addEventListener('iconClicked', emitEvent);
            await button.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });

        it('Should send an Event if gallery is clicked', async () => {
            element.value = '';
            await window.flush();
            let button = element.querySelector('.input-action');
            window.document.addEventListener('browseLibrary', emitEvent);
            await button.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });

        it('Should send an Event if post is clicked', async () => {
            element.value = 'salut !';
            await window.flush();
            let button = element.querySelector('.input-action');
            window.document.addEventListener('sendText', emitEvent);
            await button.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData('salut !');
        });
    });
});