import { TestWindow } from '@stencil/core/testing';

import { YooScrollSpyComponent } from './scroll-spy';

describe('YooScrollSpyComponent', () => {
    it('should build', () => {
        expect(new YooScrollSpyComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it ('Should render with a basic structure', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooScrollSpyComponent],
                html: '<yoo-scroll-spy></yoo-scroll-spy>'
            });
            expect(element).toMatchSnapshot();
        });
    });

    describe('events', () => {
        // xit ('should emit on enter in view', async () => {
        //     let window = new TestWindow();
        //     let element = await window.load({
        //         components: [YooScrollSpyComponent],
        //         html: '<yoo-scroll-spy></yoo-scroll-spy>'
        //     });
        //
        //
        //     let res;
        //     let emitItem = jest.fn(ev => {res = ev.detail});
        //     window.document.addEventListener('enterInView', emitItem);
        //
        //     // TODO: HERE call the action to trigger the enter in view
        //
        //     expect(emitItem).toHaveBeenCalled();
        //     expect(res).toEqual(true);
        // });

        // xit ('should emit on out of view', async () => {
        //     let window = new TestWindow();
        //     let element = await window.load({
        //         components: [YooScrollSpyComponent],
        //         html: '<yoo-scroll-spy></yoo-scroll-spy>'
        //     });
        //
        //     let res;
        //     let emitItem = jest.fn(ev => {res = ev.detail});
        //     window.document.addEventListener('outOfView', emitItem);
        //
        //     // TODO: HERE call the action to trigger the out of view
        //
        //     expect(emitItem).toHaveBeenCalled();
        //     expect(res).toEqual(true);
        // });
    });
});
