import { TestWindow } from '@stencil/core/testing';
import { YooAvatarComponent } from './avatar';

describe('YooAvatarComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooAvatarComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('Should have an image source', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: '<yoo-avatar img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>'
            });
            expect(element).toMatchSnapshot();
        });
        it('Should have a top-right icon', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: '<yoo-avatar top-right-icon="yo-fire" img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>'
            });
            expect(element).toMatchSnapshot();
        });
        it('Should have a top-left icon', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: '<yoo-avatar top-left-icon="yo-fire" img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>'
            });
            expect(element).toMatchSnapshot();
        });
        it('Should have a bottom-right icon', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: '<yoo-avatar bottom-right-icon="yo-fire" img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>'
            });
            expect(element).toMatchSnapshot();
        });
        it('Should have a bottom-left icon', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: '<yoo-avatar bottom-left-icon="yo-fire" img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>'
            });
            expect(element).toMatchSnapshot();
        });

    });
    describe('rendering', () => {
        it('Should have a four icons', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: `<yoo-avatar bottom-left-icon="yo-fire" top-left-icon="yo-fire" bottom-right-icon="yo-fire" top-right-icon="yo-fire"
                        img-src="https://www.w3schools.com/w3images/avatar2.png">
                        </yoo-avatar>`
            });
            expect(element.querySelectorAll('span')).toHaveLength(4);
        });
        it('Should not have any icons', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: `<yoo-avatar img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>`
            });
            expect(element.querySelectorAll('span')).toHaveLength(0);
        });
        it('Should have icons on the top-left and bottom-right', async () => {
            let element = await window.load({
                components: [YooAvatarComponent],
                html: `<yoo-avatar top-left-icon="yo-fire" bottom-right-icon="yo-fire" img-src="https://www.w3schools.com/w3images/avatar2.png"></yoo-avatar>`
            });
            expect(element.querySelectorAll('span.bottom-right')).toHaveLength(1);
            expect(element.querySelectorAll('span.top-left')).toHaveLength(1);
        });
    });

    describe('Events', () => {

        let element, emitEvent;
        beforeEach(async () => {
            element = await window.load(
                {components: [YooAvatarComponent],
                html: `<yoo-avatar bottom-left-icon="yo-fire" top-left-icon="yo-fire" bottom-right-icon="yo-fire" top-right-icon="yo-fire"
                        img-src="https://www.w3schools.com/w3images/avatar2.png">
                        </yoo-avatar>`
                });
            emitEvent = jest.fn();
        });

        it('Should emit an event when top right icon is clicked', async () => {
            window.document.addEventListener('topRightClicked', emitEvent);
            let icon = element.querySelector('.top-right');
            await icon.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });

        it('Should emit an event when top left icon is clicked', async () => {
            window.document.addEventListener('topLeftClicked', emitEvent);
            let icon = element.querySelector('.top-left');
            await icon.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });

        it('Should emit an event when bottom right icon is clicked', async () => {
            window.document.addEventListener('bottomRightClicked', emitEvent);
            let icon = element.querySelector('.bottom-right');
            await icon.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });

        it('Should emit an event when bottom left icon is clicked', async () => {
            window.document.addEventListener('bottomLeftClicked', emitEvent);
            let icon = element.querySelector('.bottom-left');
            await icon.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(emitEvent).toHaveEventData(true);
        });

    });
});