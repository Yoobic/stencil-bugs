import { TestWindow } from '@stencil/core/testing';
import { YooFormTimerComponent } from './form-timer';

fdescribe('YooFormTimerComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFormTimerComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('should have a class', async () => {
            let element = await window.load ({
                components: [YooFormTimerComponent],
                html: '<yoo-form-timer class="accent"></yoo-form-timer>'
            });
            expect(element).toMatchSnapshot();
        });
    });

    describe('Methods', () => {
        let comp;
        beforeEach(() => {
            comp = new YooFormTimerComponent();
        });
        it('should format a date string', () => {
            expect(comp.formatTime('Mon Apr 16 2018 01:45:58 GMT+0100')).toEqual('01:45');
        });
        it('should not calculate time if only start time', () => {
            comp.timeChanged({detail: '10:30'}, 'start');
            expect(comp.calculatedTime).toBeFalsy();
        });
    });

    describe('Events', () => {
        it('should not trigger time event', async () => {
            let element = await window.load ({
                components: [YooFormTimerComponent],
                html: '<yoo-form-timer class="accent"></yoo-form-timer>'
            });
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('timeCalculated', emitItem);
            element.timeChanged({detail: '10:30'}, 'start');
            await window.flush();
            expect(emitItem).not.toHaveBeenCalled();
        });

        it('should trigger time event', async () => {
            let element = await window.load ({
                components: [YooFormTimerComponent],
                html: '<yoo-form-timer class="accent"></yoo-form-timer>'
            });
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('timeCalculated', emitItem);
            element.timeChanged({detail: '10:30'}, 'start');
            await window.flush();
            element.timeChanged({detail: '11:30'}, 'end');
            await window.flush();
            expect(emitItem).toHaveBeenCalled();
        });
    });
});