import { TestWindow } from '@stencil/core/testing';
import { YooFabListComponent } from './fab-list';
import { YooFabContainerComponent } from '../fab-container/fab-container';
import { YooFabButtonComponent } from '../fab-button/fab-button';
jest.useFakeTimers();

describe('YooFabListComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFabListComponent()).toBeTruthy();
    });

    describe('rendering', () => {
        it('should render a yoo-fab-list with buttons inside', async () => {
            let element = await window.load({
                components: [YooFabListComponent, YooFabContainerComponent, YooFabButtonComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button></yoo-fab-button>
                    <yoo-fab-list id="list1" side="bottom">
                        <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-button></yoo-fab-button>
                    </yoo-fab-list>
                </yoo-fab-container>`
             });
             expect(element).toMatchSnapshot();
             let lists = element.querySelectorAll('yoo-fab-list');
             expect(lists).toHaveLength(1);
             let list1 = element.querySelector('#list1');
             expect(list1.querySelectorAll('yoo-fab-button')).toHaveLength(2);
        });
        it('should render multiple yoo-fab-lists with buttons inside', async () => {
            let element = await window.load({
                components: [YooFabListComponent, YooFabContainerComponent, YooFabButtonComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button></yoo-fab-button>
                    <yoo-fab-list id="list1" side="bottom">
                        <yoo-fab-button></yoo-fab-button>
                    </yoo-fab-list>
                    <yoo-fab-list id="list2" side="bottom">
                        <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-button></yoo-fab-button>
                    </yoo-fab-list>
                </yoo-fab-container>`
             });
             let lists = element.querySelectorAll('yoo-fab-list');
             expect(lists).toHaveLength(2);
             let list1 = element.querySelector('#list1');
             expect(list1.querySelectorAll('yoo-fab-button')).toHaveLength(1);
             let list2 = element.querySelector('#list2');
             expect(list2.querySelectorAll('yoo-fab-button')).toHaveLength(3);
             expect(element).toMatchSnapshot();
        });
    });

    describe('Opening and closing the list', () => {
        it('should activate the list and the main fab when the latter is pressed', async () => {
            let element = await window.load({
                components: [YooFabListComponent, YooFabContainerComponent, YooFabButtonComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button id="trigger"></yoo-fab-button>
                    <yoo-fab-list id="list1" side="right">
                        <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-button></yoo-fab-button>
                    </yoo-fab-list>
                </yoo-fab-container>`
             });
            let triggerBtn = element.querySelectorAll('.fab-button')[0];
            await triggerBtn.click();
            await window.flush();
            expect(element.querySelector('yoo-fab-button').activated).toBeTruthy();
            expect(element.querySelector('yoo-fab-list').activated).toBeTruthy();
        });
        it('should add the show class to the buttons in the list', async () => {
            let element = await window.load({
                components: [YooFabListComponent, YooFabContainerComponent, YooFabButtonComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button id="trigger"></yoo-fab-button>
                    <yoo-fab-list id="list1" side="right">
                        <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-button></yoo-fab-button>
                    </yoo-fab-list>
                </yoo-fab-container>`
             });
            expect(element.querySelectorAll('.fab-button.fab-in-list')).toHaveLength(2);
            let listContainer = element.querySelectorAll('yoo-fab-list')[0];
            listContainer.activated = true;
            jest.runOnlyPendingTimers();
            expect(element.querySelectorAll('.fab-button.fab-in-list.show')).toHaveLength(2);
        });
    });
});