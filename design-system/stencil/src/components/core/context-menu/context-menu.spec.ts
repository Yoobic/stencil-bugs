import { TestWindow } from '@stencil/core/testing';
import { YooContextMenuComponent } from './context-menu';
jest.useFakeTimers();

describe('YooContextMenuComponent', () => {
    const data = [{
        itemTitle: 'Edit',
        handler: () => alert('edit clicked')
    }, {
        itemTitle: 'Preview',
        handler: () => alert('preview clicked')
    }, {
        itemTitle: 'Expire',
        separator: true,
        handler: () => alert('expire clicked')
    }];
    it('should build', () => {
        expect(new YooContextMenuComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it ('Should render a basic structure', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooContextMenuComponent],
                html: '<yoo-context-menu></yoo-context-menu>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should render with slots', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooContextMenuComponent],
                html : `<yoo-context-menu>
                            <yoo-button slot="trigger" text="test"></yoo-button>
                            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam sequi vero laudantium cumque similique consectetur corporis blanditiis error neque ex libero, ipsa nostrum optio pariatur necessitatibus. Quas perferendis provident ipsam.</div>
                        </yoo-context-menu>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should render with items', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooContextMenuComponent],
                html: '<yoo-context-menu></yoo-context-menu>'
              });
            element.items = data;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Methods', () => {
        it('onItemClick method should call item handler', async () => {
            let element = new YooContextMenuComponent();
            let item = {
                itemTitle: 'Edit',
                handler: jest.fn()
            };
            element.items = [item, {
                itemTitle: 'Preview',
                handler: () => alert('preview clicked')
            }, {
                itemTitle: 'Expire',
                separator: true,
                handler: () => alert('expire clicked')
            }];
            element.onItemClick(item, 0);
            expect(item.handler).toHaveBeenCalled();
        });
    });

    describe('events', () => {
        let element = new YooContextMenuComponent();
        element.contextMenuClosed = {
            emit: () => {}
        };
        element.contextMenuOpened = {
            emit: () => {}
        };

        it ('should emit open on button click and close on second button click', async () => {
            const openSpy = jest.spyOn(element.contextMenuOpened, 'emit');
            const closeSpy = jest.spyOn(element.contextMenuClosed, 'emit');
            element.items = data;
            element.toggle();
            expect(openSpy).toHaveBeenCalled();
            expect(setTimeout).toHaveBeenCalledTimes(1);
            jest.runOnlyPendingTimers();
            element.toggleWindow();
            expect(closeSpy).toHaveBeenCalled();
        });
    });
});
