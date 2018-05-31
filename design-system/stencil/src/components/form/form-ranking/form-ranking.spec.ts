import { TestWindow } from '@stencil/core/testing';
import { YooFormRankingComponent } from './form-ranking';

describe('Form ranking Component', () => {

    it('Should build', async () => {
        let element = new YooFormRankingComponent();
        expect(element).toBeTruthy();
    });

    describe('ranking Items', ( () => {
        let element = new YooFormRankingComponent();

        it('should return all items as non ranked', () => {
            let items = [{value: 'a'}, {value: 'b'}, {value: 'c'}];
            let result = items;
            expect(element.organizeItems(items)).toEqual(result);
        });

        it('should return ranked items', () => {
            let items = [{value: 'a'}, {value: 'b', rank: 5}, {value: 'c', rank: 3}];
            let result = [{value: 'c', rank: 1}, {value: 'b', rank: 2}, {value: 'a'}];
            expect(element.organizeItems(items)).toEqual(result);
        });

        it('should return ranked items with zero rank', () => {
            let items = [{value: 'a'}, {value: 'b', rank: -1}, {value: 'c', rank: 3}];
            let result = [{value: 'b', rank: 1}, {value: 'c', rank: 2}, {value: 'a'}];
            expect(element.organizeItems(items)).toEqual(result);
        });

        it('should return ranked items and ordered non ranked items', () => {
            let items = [{ value: 'a', order: 2 }, { value: 'b', rank: 1, order: 3 }, { value: 'c', order: 1 }];
            let result = [{ value: 'b', rank: 1, order: 3 }, { value: 'c', order: 1 }, { value: 'a', order: 2 }];
            expect(element.organizeItems(items)).toEqual(result);
        });
    }));

    describe('Should change items ranking', () => {
        let element = new YooFormRankingComponent();
        element.changed = {
            emit: () => {}
        };
         it('should remove ranking from an item', () => {
            const changedSpy = jest.spyOn(element.changed, 'emit');
            element.values = [{value: 'b', rank: 1}, {value: 'c', rank: 2}, {value: 'a'}];
            let result = [{value: 'b', rank: 1}, {value: 'c'}, {value: 'a'}];
            element.onItemClick(1);
            expect(element.values).toEqual(result);
            expect(changedSpy).toHaveBeenCalledWith(result);
         });

         it('should add ranking to an item', () => {
            const changedSpy = jest.spyOn(element.changed, 'emit');
            element.values = [{value: 'b', rank: 1}, {value: 'c'}, {value: 'a'}];
           let result = [{value: 'b', rank: 1}, {value: 'c', rank: 2}, {value: 'a'}];
            element.onItemClick(1);
            expect(element.values).toEqual(result);
            expect(changedSpy).toHaveBeenCalledWith(result);
         });

    });

    describe('Rendering', () => {
        it('Should render with values without ranking', async () => {
            const window = new TestWindow();
            let element = await window.load({
                components: [YooFormRankingComponent],
                html: '<yoo-form-ranking></yoo-form-ranking>'
              });
            element.values = [{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}];
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should render with values with ranking', async () => {
            const window = new TestWindow();
            let element = await window.load({
                components: [YooFormRankingComponent],
                html: '<yoo-form-ranking></yoo-form-ranking>'
              });
            element.values = [{value: 'a'}, {value: 'b', rank: 1}, {value: 'c', rank: 2}, {value: 'd'}];
            await window.flush();
            expect(element).toMatchSnapshot();
        });

        it('Should render with values with ranking and order', async () => {
            const window = new TestWindow();
            let element = await window.load({
                components: [YooFormRankingComponent],
                html: '<yoo-form-ranking></yoo-form-ranking>'
              });
            element.values = [{value: 'a', order: 1}, {value: 'b', rank: 1, order: 2}, {value: 'c', rank: 2, order: 3}, {value: 'd', order: 4}];
            await window.flush();
            expect(element).toMatchSnapshot();
        });

    });

    describe('Ranking elements ', () => {
        const VALUES = [{value: 'a'}, {value: 'b', rank: 2}, {value: 'c', rank: 1}, {value: 'd'}];
        let element, window;

        function findItem (el: HTMLElement, value: string): HTMLElement {
            let item = Array.from(el.querySelectorAll('.item-container')).find((i: HTMLElement) => {
                return i.querySelector('.item-container > span').textContent === value;
            });
            return <HTMLElement>item;
        }

        beforeEach(async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooFormRankingComponent],
                html: '<yoo-form-ranking></yoo-form-ranking>'
            });
            element.values = VALUES;
            window.flush();
        });

        it('Should select and unselect an element', async () => {
            let item = findItem(element, 'a');
            item.click();
            expect(element).toMatchSnapshot();
            item = findItem(element, 'a');
            item.click();
            expect(element).toMatchSnapshot();
        });

        it('Should unselect and select an element', async () => {
            let item = findItem(element, 'c');
            item.click();
            expect(element).toMatchSnapshot();
            item = findItem(element, 'c');
            item.click();
            expect(element).toMatchSnapshot();
        });
    });
});