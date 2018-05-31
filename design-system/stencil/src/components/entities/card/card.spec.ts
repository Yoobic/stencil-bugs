import { TestWindow } from '@stencil/core/testing';
import { YooCardComponent } from './card';
import { YooFormCheckboxComponent } from '../../form/form-checkbox/form-checkbox';

jest.mock('../../../utils/helpers/helpers');

describe('YooCardComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooCardComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('Should have a heading', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });
        it('should have list type', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card title="Title 1" type="list"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });
        it('Should have an image source', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card img-src="http://www.twitrcovers.com/wp-content/uploads/2012/10/Star-Wars-l.jpg"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });
        it('Should be activable', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card is-activable="true" heading="Title 1"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });
        it('Should have a badge', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1" top-left-badge="tl"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });
        it('Should have avatar images', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1"></yoo-card>'
              });
              element.avatarImg = ['./assets/grid/empty-state-1.svg', './assets/grid/empty-state-1.svg', './assets/grid/empty-state-1.svg'];
              expect(element).toMatchSnapshot();
        });
        it('Should have a menu', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1" has-menu="true"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });
        it('Should have date', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1" date="25/03/1994"></yoo-card>'
              });
              expect(element).toMatchSnapshot();
        });

        it('Should have tags', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1"></yoo-card>'
              });
              element.tags = [{text: 'Finished', icon: 'yo-flag'}, {text: 'Fire Account', icon: 'yo-fire'}];
              await window.flush(element);
              expect(element).toMatchSnapshot();
        });
    });

    describe('Rendering', () => {
        it ('Should be active when the checkbox is checked', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1" is-activable="true"></yoo-card>'
              });
            expect(element.getElementsByTagName('yoo-form-checkbox')).toHaveLength(1);
            expect(element.getElementsByClassName('outer-container')).toHaveLength(1);
        });
        it ('Should render a user card', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1"></yoo-card>'
              });
              expect(element.getElementsByTagName('yoo-avatar')).toHaveLength(0);
              element.avatarShape = 'circle';
              await window.flush();
              expect(element.getElementsByTagName('yoo-avatar')).toHaveLength(1);

        });
        it ('Should remove the checkbox when not activable', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card heading="Title 1" is-activable="true"></yoo-card>'
              });
              expect(element.getElementsByTagName('yoo-form-checkbox')).toHaveLength(1);
              element.isActivable = false;
              await window.flush();
              expect(element.getElementsByTagName('yoo-form-checkbox')).toHaveLength(0);

        });
        it ('Should remove the menu when no-menu is specified', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card has-menu="true" heading="Title 1"></yoo-card>'
              });
              expect(element.getElementsByClassName('yo-more-v')).toHaveLength(1);
              element.hasMenu = false;
              await window.flush();
              expect(element.getElementsByClassName('yo-more-v')).toHaveLength(0);
        });
    });

    describe('Events', () => {
        it('Should emit actionPress event when action is clicked', async () => {
            let element = await window.load({
                components: [YooCardComponent],
                html: '<yoo-card action-button-title="Action"></yoo-card>'
            });
            await window.flush();
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('actionPress', emitItem);
            await element.querySelector('div.action-button-container > yoo-button').click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(true);
        });

        it('Should emit active event when the checkbox is clicked, should also update active class', async () => {
            let element = await window.load({
                components: [YooCardComponent, YooFormCheckboxComponent],
                html: '<yoo-card is-activable="true"></yoo-card>'
            });
            await window.flush();
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('active', emitItem);

            let outerContainer = element.querySelector('.outer-container');
            expect(outerContainer.classList).not.toContain('active');

            let checkbox = element.querySelector('yoo-form-checkbox .text-container');
            await checkbox.click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(true);
            await window.flush();
            expect(outerContainer.classList).toContain('active');
            await checkbox.click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(false);
            await window.flush();
            expect(outerContainer.classList).not.toContain('active');
        });
    });
});
