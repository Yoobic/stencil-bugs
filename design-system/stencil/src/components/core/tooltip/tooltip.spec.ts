jest.mock('tippy.js');

import { TestWindow } from '@stencil/core/testing';
import { YooTooltipComponent } from './tooltip';
// import tippy from 'tippy.js';

describe('YooTooltipComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooTooltipComponent()).toBeTruthy();
    });

    describe('property rendering', () => {
        it ('should render a basic tooltip with text', async () => {
            let element;
            element = await window.load({
                components: [YooTooltipComponent],
                html: '<yoo-tooltip text="this is the title"></yoo-tooltip>'
            });
            expect(element).toBeTruthy();
            expect(element).toMatchSnapshot();
        });
        it ('should render a basic tooltip with text around some content', async () => {
            let element;
            element = await window.load({
                components: [YooTooltipComponent],
                html: '<yoo-tooltip text="this is the title"><div>Some content</div></yoo-tooltip>'
            });
            expect(element).toMatchSnapshot();
        });
        it ('should render a basic tooltip with text with placement around some content', async () => {
            let element;
            element = await window.load({
                components: [YooTooltipComponent],
                html: '<yoo-tooltip placement="right" text="this is the title"><div>Some content</div></yoo-tooltip>'
            });
            expect(element).toMatchSnapshot();
        });
    });
    describe('setup functionality', () => {
        it ('should call the load tippy function when it renders', async () => {
            let element = new YooTooltipComponent();
            element.loadTippy = jest.fn();
            await element.componentWillLoad();
            expect(element.loadTippy).toHaveBeenCalled();
        });
    });
});