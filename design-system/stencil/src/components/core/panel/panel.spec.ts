import { TestWindow } from '@stencil/core/testing';
import { YooPanelComponent } from './panel';

describe('YooPanelComponent', () => {
    it('should build', () => {
        expect(new YooPanelComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('Should render', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooPanelComponent],
                html: '<yoo-panel></yoo-panel>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should render with width', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooPanelComponent],
                html: '<yoo-panel width="100"></yoo-panel>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('Should render with height', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooPanelComponent],
                html: '<yoo-panel height="100"></yoo-panel>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('Should render with width and height', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooPanelComponent],
                html: '<yoo-panel width="100" height="100"></yoo-panel>'
            });
            expect(element).toMatchSnapshot();
            await window.flush();
            expect(element.getElementsByClassName('outer-container')).toHaveLength(1);
        });
    });

    describe('rendering', () => {
        let element;
        beforeEach( async () => {
          let window = new TestWindow();
          element = await window.load({
            components: [YooPanelComponent],
            html: '<yoo-panel></yoo-panel>'
          });
        });
        it ('should render', async () => {
            expect(element).toBeTruthy();
        });
    });
});
