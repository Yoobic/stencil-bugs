import { TestWindow } from '@stencil/core/testing';

jest.mock('../../../utils/anim');

import { YooModalComponent } from './modal';

fdescribe('YooModalComponent', () => {
    it('should build', () => {
        expect(new YooModalComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('Should have a heading and a header', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal heading="this is text"></yoo-modal>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have no header', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal has-header="false"></yoo-modal>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have a heading icon', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal heading="this is text" heading-icon="yo-fire"></yoo-modal>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have a footer', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal has-footer="true"></yoo-modal>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have content', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: `<yoo-modal>
                        <div >Test content</div>
                        </yoo-modal>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have custom primary button text', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: `<yoo-modal primary-button-text="Hello"></yoo-modal>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have custom secondary button text', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: `<yoo-modal secondary-button-text="Hello"></yoo-modal>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should be a full screen modal', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: `<yoo-modal css-class="fullscreen"></yoo-modal>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should be a drawer modal', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: `<yoo-modal css-class="drawer"></yoo-modal>`
            });
            expect(element).toMatchSnapshot();
        });
    });

    describe('rendering', () => {
        it('Should render no heading if hasHeader equals false', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal has-header="false" heading="I should not exist"></yoo-modal>'
            });
            expect(element.getElementsByClassName('modal-header')).toHaveLength(0);
            expect(element.getElementsByClassName('modal-heading')).toHaveLength(0);
        });

        it('Should render no footer by default', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal></yoo-modal>'
            });
            expect(element.getElementsByClassName('modal-footer')).toHaveLength(0);
        });

        // TO DO: fix modal entry tests
        describe('modal-entry-rendering', () => {
            it('Should render content', async () => {
                let window = new TestWindow();
                let element = await window.load({
                    components: [YooModalComponent],
                    html: '<yoo-modal></yoo-modal>'
                });
                let htmlElement = document.createElement('div');
                htmlElement.innerHTML = `<div class="test">This is the test text</div>`;
                let modalProps = { content: htmlElement };
                element = await Object.assign(element, modalProps);
                await window.flush();
                //expect(element.querySelector('div.test')).toBeTruthy();
                //expect(element.querySelector('div.test').innerHTML).toEqual('This is the test text');
            });

            it('Should render heading', async () => {
                let window = new TestWindow();
                let element = await window.load({
                    components: [YooModalComponent],
                    html: '<yoo-modal></yoo-modal>'
                });
                let modalProps = { heading: 'Arigato' };
                element = await Object.assign(element, modalProps);
                expect(element.heading).toEqual('Arigato');
                await window.flush();
                // expect(element.getElementsByClassName('modal-heading')).toHaveLength(1);
                // expect(element.getElementsByClassName('modal-heading')[0].innerHTML).toEqual('Arigato');
            });
        });
    });

    describe('events', () => {
        let window, element, res, emitEvent;
        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooModalComponent],
                html: '<yoo-modal has-footer="true" primary-button-text="primary" secondary-button-text="secondary"></yoo-modal>'
            });
            emitEvent = jest.fn(ev => { res = ev.detail; });
        });
        it('should emit modalPrimaryButtonClicked on primary button click', async () => {
            window.document.addEventListener('primaryButtonClicked', emitEvent);
            let button = element.querySelector('.primary-button > yoo-button');
            await button.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(res).toEqual(true);
        });
        it('should emit modalClosed on secondary button click', async () => {
            window.document.addEventListener('closed', emitEvent);
            let button = element.querySelector('.secondary-button > yoo-button');
            await button.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(res).toEqual(true);
        });
    });
});
