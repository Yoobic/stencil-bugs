import { TestWindow } from '@stencil/core/testing';
import { YooToolbarComponent } from './toolbar';

describe('YooToolbarComponent', () => {
    it('should build', () => {
        expect(new YooToolbarComponent()).toBeTruthy();
    });

    describe('property rendering', () => {
        it ('should render', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooToolbarComponent],
                html: '<yoo-toolbar></yoo-toolbar>'
            });
            expect(element).toBeTruthy();
            expect(element).toMatchSnapshot();
        });
        it ('should render any content in the slot', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooToolbarComponent],
                html: '<yoo-toolbar><div>Hey</div></yoo-toolbar>'
            });
            expect(element).toMatchSnapshot();
        });
        it ('should render with actions', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooToolbarComponent],
                html: '<yoo-toolbar></yoo-toolbar>'
            });
            element.actions = [ { title: 'Action 1'}, { title: 'Action 2'}];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('.action')).toHaveLength(2);
        });
        it ('should highlight the active action and call the handler', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooToolbarComponent],
                html: '<yoo-toolbar></yoo-toolbar>'
            });
            let handler = jest.fn();
            element.actions = [{ title: 'Action 1', handler: handler}, { title: 'Action 2', handler: handler}];
            element.showActive = true;
            await window.flush();
            let activeAction = element.querySelectorAll('.action')[0];
            await activeAction.click();
            expect(handler).toHaveBeenCalled();
            await window.flush();
            expect(element.querySelectorAll('.active')).toHaveLength(1);
        });
    });
    describe('helper methods', () => {
        it('should get the color corresponding to the index', async () => {
            let element = new YooToolbarComponent();
            let color = element.getColor(0);
            expect(color).toEqual('accent');
        });
    });

});
