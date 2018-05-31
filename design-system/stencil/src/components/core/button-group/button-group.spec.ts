import { TestWindow } from '@stencil/core/testing';
import { YooButtonGroupComponent } from './button-group';

describe('YooButtonGroupComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooButtonGroupComponent()).toBeTruthy();
    });
    describe('Snapshots', () => {
        it('Should project content correctly', async () => {
            let element = await window.load({
                components: [YooButtonGroupComponent],
                html: `<yoo-button-group>
                <yoo-button text="button 1"></yoo-button>
                <yoo-button text="button 2"></yoo-button>
                </yoo-button-group>`
            });
            expect(element).toMatchSnapshot();
        });
        it('Should create a dropdown button with the correct title', async () => {
            let element = await window.load({
                components: [YooButtonGroupComponent],
                html: `<yoo-button-group is-dropdown="true" dropdown-title="Button dropdown>
                <yoo-button text="button 1"></yoo-button>
                <yoo-button text="button 2"></yoo-button>
                </yoo-button-group>`
            });
            expect(element).toMatchSnapshot();
        });
    });
    describe('Rendering', () => {
        it('Should render with 3 buttons', async () => {
            let element = await window.load({
                components: [YooButtonGroupComponent],
                html:  `<yoo-button-group>
                            <yoo-button text="button 1"></yoo-button>
                            <yoo-button text="button 2"></yoo-button>
                            <yoo-button text="button 3"></yoo-button>
                        </yoo-button-group>`
             });

             expect(element.getElementsByTagName('yoo-button').length).toBe(3);
        });
    });
});
