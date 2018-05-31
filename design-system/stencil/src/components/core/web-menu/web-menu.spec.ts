import { TestWindow } from '@stencil/core/testing';
import { WebMenuComponent } from './web-menu';

describe('WebMenuComponent', () => {
    it('should build', () => {
        expect(new WebMenuComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [WebMenuComponent],
                html: '<yoo-web-menu></yoo-web-menu>'
            });
        });

        it('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it('Should render with an entry', async () => {
            let entry = {
                logo: 'assets/logo/operations_simple.svg',
                items: [{ label: 'action1', icon: 'yo-fire', handler: () => { } },
                { label: 'action2', icon: 'yo-yo', handler: () => { } },
                { label: 'action3', icon: 'yo-more', handler: () => { } },
                { label: 'page1', icon: 'yo-trophy', href: 'http://trophy' },
                { label: 'page2', icon: 'yo-star', href: 'http://star' },
                { label: 'page3', icon: 'yo-fire', href: 'http://fire' }],
                user: { imgData: 'https://resources.stuff.co.nz/content/dam/images/1/i/o/a/a/c/image.related.StuffLandscapeSixteenByNine.620x349.1ioalf.png/1492902717643.jpg' }
            };
            element.entry = entry;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window;
        beforeEach(async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });

        it('Should emit an event when clicked on the avatar', async () => {
            let element = await window.load({
                components: [WebMenuComponent],
                html: '<yoo-web-menu></yoo-web-menu>'
            });
            let entry = { user: { imageData: 'http://dfghl' } };
            element.entry = entry;
            await window.flush();
            let avatar = element.querySelector('yoo-avatar');
            window.document.addEventListener('profilClicked', emitEvent);
            await avatar.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(element.entry.user);
        });

        it('Should emit an event when clicked on an item', async () => {
            let element = await window.load({
                components: [WebMenuComponent],
                html: '<yoo-web-menu></yoo-web-menu>'
            });
            let handler1 = jest.fn();
            let entry = {
                items: [
                    { label: 'action1', icon: 'yo-fire', handler: handler1 },
                    { label: 'action2', icon: 'yo-yo', handler: () => { } },
                    { label: 'action3', icon: 'yo-more', handler: () => { } }
                ]
            };
            element.entry = entry;
            await window.flush();
            let item = element.querySelector('.menu-items .menu-icon');
            window.document.addEventListener('itemClicked', emitEvent);
            await item.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(element.entry.items[0]);
        });
    });
});