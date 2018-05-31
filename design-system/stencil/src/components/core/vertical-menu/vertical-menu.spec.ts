import { TestWindow } from '@stencil/core/testing';
import { YooVerticalMenuComponent } from './vertical-menu';
import { IVerticalMenuRow, IVerticalMenuEntry, IVerticalMenuItem } from '@shared/interfaces';
import { YooModalComponent } from '../modal/modal';

describe('YooVerticalMenuComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooVerticalMenuComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it('Should render', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent],
                html: '<yoo-vertical-menu></yoo-vertical-menu>'
            });
            expect(element).toBeTruthy();
        });

        it('Should render with only one Title', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent],
                html: '<yoo-vertical-menu></yoo-vertical-menu>'
            });
            expect(element.entry).toEqual({ menuRows: [] });
            let verticalTitle: IVerticalMenuItem = { text: 'Title' };
            let verticalRow: IVerticalMenuRow = { item: verticalTitle };
            let entry: IVerticalMenuEntry = { menuRows: [verticalRow] };
            element.entry = entry;
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should render with a prop title', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent],
                html: '<yoo-vertical-menu title="My Menu"></yoo-vertical-menu>'
            });
            expect(element.entry).toEqual({ menuRows: [] });
            let verticalTitle: IVerticalMenuItem = { text: 'Title' };
            let verticalRow: IVerticalMenuRow = { item: verticalTitle };
            let entry: IVerticalMenuEntry = { menuRows: [verticalRow] };
            element.entry = entry;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should render with a fixed display', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent],
                html: '<yoo-vertical-menu fixed="true"></yoo-vertical-menu>'
            });
            expect(element.entry).toEqual({ menuRows: [] });
            let verticalTitle: IVerticalMenuItem = { text: 'Title' };
            let verticalRow: IVerticalMenuRow = { item: verticalTitle };
            let entry: IVerticalMenuEntry = { menuRows: [verticalRow] };
            element.entry = entry;
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should render correctly with a complex entry', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent],
                html: '<yoo-vertical-menu></yoo-vertical-menu>'
            });
            expect(element.entry).toEqual({ menuRows: [] });
            let verticalTitle: IVerticalMenuItem = { text: 'Title' };
            let verticalTitleActive: IVerticalMenuItem = { text: 'Title', isActive: true };
            let verticalTitle2: IVerticalMenuItem = { text: 'Title Bis', imgSrc: './assets/grid/empty-state-1.svg' };
            let verticalTitle3: IVerticalMenuItem = { text: 'Title Ter', imgSrc: './assets/grid/empty-state-1.svg', isActive: true };
            let verticalRow: IVerticalMenuRow = { item: verticalTitle };
            let verticalRowActive: IVerticalMenuRow = { item: verticalTitleActive };
            let verticalRow2: IVerticalMenuRow = { item: verticalTitle2, subItems: [verticalTitle, verticalTitle3] };
            let verticalRow3: IVerticalMenuRow = { item: verticalTitle, subItems: [verticalTitle, verticalTitle, verticalTitle] };
            let entry: IVerticalMenuEntry = { menuRows: [verticalRowActive, verticalRow, verticalRow2, verticalRow, verticalRow3] };
            element.entry = entry;
            await window.flush();
            expect(element).toMatchSnapshot();
        });

    });

    // Event
    fdescribe('Events', () => {
        it('Should emit an event when closed', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent, YooModalComponent],
                html: '<yoo-vertical-menu></yoo-vertical-menu>'
            });
            element.fixed = false;
            await window.flush();
            let modal = element.querySelector('yoo-modal');
            let res;
            let emitItem = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('menuClosed', emitItem);
            await modal.close();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(true);
        });

        it('Should emit an event when an item is clicked with the corresponding payload', async () => {
            let element = await window.load({
                components: [YooVerticalMenuComponent],
                html: '<yoo-vertical-menu></yoo-vertical-menu>'
            });
            expect(element.entry).toEqual({ menuRows: [] });
            let verticalTitle: IVerticalMenuItem = { text: 'Title' };
            let verticalTitleActive: IVerticalMenuItem = { text: 'Title', isActive: true };
            let verticalTitle2: IVerticalMenuItem = { text: 'Title Bis', imgSrc: './assets/grid/empty-state-1.svg', emittedEvent: 'title bis event' };
            let verticalTitle3: IVerticalMenuItem = { text: 'Title Ter', imgSrc: './assets/grid/empty-state-1.svg', isActive: true, emittedEvent: 'title ter event' };
            let verticalRow: IVerticalMenuRow = { item: verticalTitle };
            let verticalRowActive: IVerticalMenuRow = { item: verticalTitleActive };
            let verticalRow2: IVerticalMenuRow = { item: verticalTitle2, subItems: [verticalTitle, verticalTitle3] };
            let verticalRow3: IVerticalMenuRow = { item: verticalTitle, subItems: [verticalTitle, verticalTitle, verticalTitle] };
            let entry: IVerticalMenuEntry = { menuRows: [verticalRowActive, verticalRow, verticalRow2, verticalRow, verticalRow3] };
            element.entry = entry;
            await window.flush();

            let res;
            let emitItem = jest.fn(ev => { res = ev.detail; });
            window.document.addEventListener('itemClicked', emitItem);
            let items = element.querySelectorAll('.item');
            expect(items[0].classList).toContain('active');
            expect(items[1].classList).not.toContain('active');
            expect(items[2].classList).not.toContain('active');

            // First click
            await items[1].click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual({ text: 'Title', isActive: true });
            //await window.flush();
            //expect(element.entry.menuRows[0].item.isActive).toEqual(true);

            // Second click with custom payload
            await items[2].click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(verticalTitle2);

            // Third click with custom payload
            await items[4].click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual(verticalTitle3);
        });
    });
});
