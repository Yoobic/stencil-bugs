import { TestWindow } from '@stencil/core/testing';
import { YooFabButtonComponent } from './fab-button';
import { YooFabListComponent } from '../fab-list/fab-list';
import { YooFabContainerComponent } from '../fab-container/fab-container';

describe('YooFabButtonComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFabButtonComponent()).toBeTruthy();
    });
    it ('should render a yoo-button inside the yoo-fab', async () => {
        let element = await window.load({
            components: [YooFabButtonComponent],
            html: '<yoo-fab-button class="top-right" icon="yo-fire"></yoo-fab-button>'
        });
        expect(element.getElementsByTagName('yoo-button')).toHaveLength(1);
    });
    describe('FabButtonEntry', () => {
        it('Should have an icon', async () => {
            let element = await window.load({
                components: [YooFabButtonComponent],
                html: '<yoo-fab-button></yoo-fab-button>'
              });
            element.fabEntry = {
                icon: 'yo-fire'
            };
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should have a title', async () => {
            let element = await window.load({
                components: [YooFabButtonComponent],
                html: '<yoo-fab-button></yoo-fab-button>'
              });
            element.fabEntry = {
                title: 'Hello'
            };
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should have a handler function and call it when clicked', async () => {
            let element = await window.load({
                components: [YooFabButtonComponent],
                html: '<yoo-fab-button></yoo-fab-button>'
            });
            let clicked = jest.fn();
            element.fabEntry = {
                icon: 'yo-fire',
                handler: clicked
            };
            await window.flush();
            let innerDiv = element.querySelector('.fab-button');
            await innerDiv.click();
            expect(clicked).toBeCalled();
            expect(element).toMatchSnapshot();
        });
        it('Should have a label', async () => {
            let element = await window.load({
                components: [YooFabButtonComponent, YooFabListComponent],
                html: `<yoo-fab-list>
                <yoo-fab-button label="title"></yoo-fab-button>
                </yoo-fab-list>`
            });
            expect(element.querySelectorAll('yoo-badge')).toHaveLength(1);
            expect(element).toMatchSnapshot();
        });
    });
    describe('Rendering', () => {
        it('Should be disabled', async () => {
            let clicked = jest.fn();
            let element = await window.load({
                components: [YooFabButtonComponent],
                html: `<yoo-fab-button disabled="true" id="btn"></yoo-fab-button>`
            });
            let button = element.querySelector('yoo-button');
            button.addEventListener('click', clicked);
            await element.click();
            expect(clicked).not.toBeCalled();
            expect(element.disabled).toBeTruthy();
        });

        it('Should be in container', async () => {
            let element = await window.load({
                components: [YooFabButtonComponent, YooFabContainerComponent],
                html: `<yoo-fab-container>
                <yoo-fab-button id="btn"></yoo-fab-button>
                </yoo-fab-container>`
            });
            expect(element).toMatchSnapshot();
            let btn = element.querySelector('#btn');
            let parentNode = btn.parentElement;
            let parentTag = parentNode.nodeName;

            expect(parentTag).toEqual('YOO-FAB-CONTAINER');
        });

        it('Should be in list', async () => {
            let element = await window.load({
                components: [YooFabButtonComponent, YooFabListComponent],
                html: `<yoo-fab-list>
                <yoo-fab-button id="btn"></yoo-fab-button>
                </yoo-fab-list>`
            });
            expect(element).toMatchSnapshot();
            let btn = element.querySelector('#btn');
            let parentNode = btn.parentElement;
            let parentTag = parentNode.nodeName;

            expect(parentTag).toEqual('YOO-FAB-LIST');
        });
    });
});
