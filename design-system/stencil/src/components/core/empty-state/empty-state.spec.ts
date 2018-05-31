import { TestWindow } from '@stencil/core/testing';
import { YooEmptyStateComponent } from './empty-state';

jest.mock('../../../utils/anim');

describe('YooEmptyStateComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooEmptyStateComponent()).toBeTruthy();
    });

    describe('rendering', () => {
        it ('should render', async () => {
            let element = await window.load({
                components: [YooEmptyStateComponent],
                html: '<yoo-empty-state></yoo-empty-state>'
            });
            expect(element).toMatchSnapshot();
        });
        it('should create an empty state of a given type', async () => {
            let element = await window.load({
                components: [YooEmptyStateComponent],
                html: '<yoo-empty-state type="type"></yoo-empty-state>'
            });
            expect(element).toMatchSnapshot();
        });
    });
    describe('helper methods', () => {
        it ('should return the correct path if no type is specified', async () => {
            let comp = new YooEmptyStateComponent();
            let assetPath = comp.getIconSrc();
            expect(assetPath).toEqual('./assets/empty-states/empty.svg');
        });
        it ('should return the correct path if the type is specified', async () => {
            let comp = new YooEmptyStateComponent();
            comp.type = 'type';
            let assetPath = comp.getIconSrc();
            expect(assetPath).toEqual('./assets/empty-states/type.svg');
        });
    });
});