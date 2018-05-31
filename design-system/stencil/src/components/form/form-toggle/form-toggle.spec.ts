import { TestWindow } from '@stencil/core/testing';
import { YooFormToggleComponent } from './form-toggle';

jest.mock('../../../utils/anim');

fdescribe('YooFormToggleComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFormToggleComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('should render', async () => {
            let element;
            element = await window.load({
                components: [YooFormToggleComponent],
                html: '<yoo-form-toggle class="accent"></yoo-form-toggle>'
            });
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', async () => {
        it('should fire an event on click', async () => {
            let element = await window.load({
                components: [YooFormToggleComponent],
                html: '<yoo-form-toggle></yoo-form-toggle>'
            });
            let toggle: HTMLElement = element.querySelector('.outer-container');
            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('inputChanged', emitItem);
            await toggle.click();
            expect(emitItem).toHaveBeenCalled();
        });
    });
});
