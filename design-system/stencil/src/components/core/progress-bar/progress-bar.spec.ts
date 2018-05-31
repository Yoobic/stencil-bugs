import { TestWindow } from '@stencil/core/testing';
import { YooProgressBarComponent } from './progress-bar';

describe('YooProgressBarComponent', () => {
    it('should build', () => {
        expect(new YooProgressBarComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('Should have  progress displayed', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooProgressBarComponent],
                html: '<yoo-progress-bar progress="34"></yoo-progress-bar>'
              });
            expect(element).toMatchSnapshot();
        });

        it ('Should be displayed as a circle progress', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooProgressBarComponent],
                html: '<yoo-progress-bar progress="34" circle="true"></yoo-progress-bar>'
              });
            expect(element).toMatchSnapshot();
        });

        it ('Should be displayed as a circle without progress', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooProgressBarComponent],
                html: '<yoo-progress-bar progress="34" circle="true" hide-progress="true"></yoo-progress-bar>'
              });
            expect(element).toMatchSnapshot();
        });

    });

    describe('Rendering', () => {
        it('Should re-render when progress is updated', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooProgressBarComponent],
                html: '<yoo-progress-bar progress="67"></yoo-progress-bar>'
             });
             expect(element.progress).toEqual(67);
             element.progress = 98;
             await window.flush();
             expect(element.progress).toEqual(98);
             expect(element).toBeTruthy();
        });

        it('Should re-render when circle is updated', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooProgressBarComponent],
                html: '<yoo-progress-bar progress="67"></yoo-progress-bar>'
             });
             expect(element.circle).toEqual(false);
             element.circle = true;
             await window.flush();
             expect(element.circle).toEqual(true);
             expect(element).toBeTruthy();
        });

        it('Should re-render when hide-progress is updated', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooProgressBarComponent],
                html: '<yoo-progress-bar progress="67"></yoo-progress-bar>'
             });
             expect(element.hideProgress).toEqual(false);
             element.hideProgress = true;
             await window.flush();
             expect(element.hideProgress).toEqual(true);
             expect(element).toBeTruthy();
        });
    });
});
