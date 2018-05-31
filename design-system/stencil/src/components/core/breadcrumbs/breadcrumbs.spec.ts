import { TestWindow } from '@stencil/core/testing';
let mockDimensions = jest.fn();
jest.mock('../../../utils/helpers', () => {
    return {
        getElementDimensions: mockDimensions
    };
});
import { YooBreadcrumbsComponent } from './breadcrumbs';

describe('YooBreadcrumbsComponent', () => {
    it('should build', () => {
        expect(new YooBreadcrumbsComponent()).toBeTruthy();
    });

    describe('property rendering', () => {
        beforeEach(() => {
            mockDimensions.mockImplementation(() => {
                return {width: 600, height: 100};
            });
        });
        it('Should have navigation items', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2'];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('.breadcrumb-item')).toHaveLength(2);
        });
        it('Should have an active navigation item', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2'];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('.active')).toHaveLength(1);
            expect(element.querySelector('.active').querySelector('span').innerHTML).toBe('Item 2');
        });
        it('Should have a the correct number of items', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 400, height: 100};
            });
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('.breadcrumb-item')).toHaveLength(5);
        });
        it('Should have a context menu if there are more than 7 items navigation items', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('yoo-context-menu')).toHaveLength(1);
            expect(element.querySelectorAll('.breadcrumb-item')).toHaveLength(8);
        });
        it('Should not have a context menu if there are less than 7 items navigation items', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('yoo-context-menu')).toHaveLength(0);
            expect(element.querySelectorAll('.breadcrumb-item')).toHaveLength(6);
        });
        it('Should not have a context menu if there are exactly 7 items navigation items', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7'];
            await window.flush();
            expect(element).toMatchSnapshot();
            expect(element.querySelectorAll('yoo-context-menu')).toHaveLength(0);
            expect(element.querySelectorAll('.breadcrumb-item')).toHaveLength(7);
        });
    });

    describe('events', () => {
        it ('should emit on button click with rendering', async () => {
            let window = new TestWindow();
            let element = await window.load({
                components: [YooBreadcrumbsComponent],
                html: '<yoo-breadcrumbs></yoo-breadcrumbs>'
            });
            element.items = ['Item 1', 'Item 2'];
            await window.flush();

            let res;
            let emitItem = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('itemSelected', emitItem);
            await element.querySelector('.breadcrumb-item').click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual('Item 1');
        });
    });
});
