import { TestWindow } from '@stencil/core/testing';
import { YooFabContainerComponent } from './fab-container';
import { YooFabButtonComponent } from '../fab-button/fab-button';
import { YooFabListComponent } from '../fab-list/fab-list';

describe('YooFabContainerComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFabContainerComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it('should render a yoo-fab-button inside a container', async () => {
            let element = await window.load({
                components: [YooFabContainerComponent, YooFabButtonComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button></yoo-fab-button>
                </yoo-fab-container>`
             });
             expect(element).toMatchSnapshot();
             expect(element.querySelectorAll('yoo-fab-button')).toHaveLength(1);
        });
        it('should render a yoo-fab-list with buttons inside a container', async () => {
            let element = await window.load({
                components: [YooFabContainerComponent, YooFabButtonComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-list>
                            <yoo-fab-button></yoo-fab-button>
                            <yoo-fab-button></yoo-fab-button>
                        </yoo-fab-list>
                </yoo-fab-container>`
             });
             expect(element).toMatchSnapshot();
             expect(element.querySelectorAll('yoo-fab-button')).toHaveLength(3);
             expect(element.querySelectorAll('yoo-fab-list')).toHaveLength(1);
        });
        it('should render multiple with buttons inside a container', async () => {
            let element = await window.load({
                components: [YooFabContainerComponent, YooFabButtonComponent, YooFabListComponent],
                html: `<yoo-fab-container>
                    <yoo-fab-button></yoo-fab-button>
                        <yoo-fab-list>
                            <yoo-fab-button></yoo-fab-button>
                            <yoo-fab-button></yoo-fab-button>
                        </yoo-fab-list>
                        <yoo-fab-list>
                            <yoo-fab-button></yoo-fab-button>
                            <yoo-fab-button></yoo-fab-button>
                        </yoo-fab-list>
                        <yoo-fab-list>
                            <yoo-fab-button></yoo-fab-button>
                            <yoo-fab-button></yoo-fab-button>
                        </yoo-fab-list>
                </yoo-fab-container>`
             });
             expect(element).toMatchSnapshot();
             expect(element.querySelectorAll('yoo-fab-button')).toHaveLength(7);
             expect(element.querySelectorAll('yoo-fab-list')).toHaveLength(3);
        });
    });
});