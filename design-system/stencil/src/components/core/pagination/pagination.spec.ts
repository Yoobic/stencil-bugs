import { TestWindow } from '@stencil/core/testing';

let mockDimensions = jest.fn();
jest.mock('../../../utils/helpers', () => {
    return {
        getElementDimensions: mockDimensions
    };
});

import { YooPaginationComponent } from './pagination';

describe('YooPaginationComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });
    it('should instantiate', () => {
        expect(new YooPaginationComponent()).toBeTruthy();
    });
    describe ('Total Pages calculations', () => {

        let comp;
        beforeEach(() => {
            comp = new YooPaginationComponent();
        });

        it('should return extra page for extra items', () => {
            comp.totalItems = 16;
            comp.itemsPerPage = 10;
            expect(comp.totalPages).toEqual(2);
        });

        it('should return exact number of total pages', () => {
            comp.totalItems = 10;
            comp.itemsPerPage = 10;
            expect(comp.totalPages).toEqual(1);
        });

        it('should return 0 if items per page is 0 ', () => {
            comp.totalItems = 16;
            comp.itemsPerPage = 0;
            expect(comp.totalPages).toEqual(0);
        });

        it('should return 0 if items per page is not defined ', () => {
            comp.totalItems = 16;
            expect(comp.totalPages).toEqual(0);
        });

    });

    describe('calcualte pager size', () => {

        let comp;
        beforeEach(() => {
            comp = new YooPaginationComponent();
        });

        it('should return total items. No description', () => {
            comp.totalItems = 10;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(1000)).toEqual(1);
        });

        it('should return total items. With description', () => {
            comp.showTotal = true;
            comp.totalItems = 10;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(1000)).toEqual(1);
        });

        it('should return space available. No description', () => {
            comp.showTotal = false;
            comp.totalItems = 100;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(80 + 125)).toEqual(3);
        });

        it('should return space available. Description omitted', () => {
            comp.showTotal = true;
            comp.totalItems = 100;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(80 + 140 + 125)).toEqual(6);
        });

        it('should return max pager size', () => {
            comp.showTotal = true;
            comp.totalItems = 200;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(1000)).toEqual(11);
        });

        it('should return provided max pager size', () => {
            comp.showTotal = true;
            comp.totalItems = 100;
            comp.maxPagerSize = 8;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(1000)).toEqual(8);
        });

        it('should return 0 when width is 0', () => {
            comp.showTotal = true;
            comp.totalItems = 100;
            comp.maxPagerSize = 8;
            comp.itemsPerPage = 10;
            expect(comp.getPagerSize(0)).toEqual(0);
        });

    });

    describe('calculate display values', () => {

        let comp;
        function calculateValues (size: number): Array<string | number>  {
            return [...Array(size)].fill(0).map( (_, k) => comp.getDisplayValue(k + 1) );
        }

        let mockTotalPages;
        beforeEach(() => {
            mockTotalPages = jest.fn();
            comp = new YooPaginationComponent();
            Object.defineProperty(comp, 'totalPages', {
                get: mockTotalPages,
                configurable: true
            });
        });

        it ('should display all pages', () => {
            const pagerSize = 5;
            comp.pagerSize = pagerSize;
            comp.currentPage = 1;
            mockTotalPages.mockImplementation(() => pagerSize);
            let res = calculateValues(pagerSize);
            expect(res).toEqual([1, 2, 3, 4, 5]);
        });

        describe ('odd array', () => {
            const pagerSize = 7;
            let res: Array<string | number> = [];
            beforeEach (() => {
                comp.pagerSize = pagerSize;
                mockTotalPages.mockImplementation(() => 100);
            });
            const results = [
                { current: 95, values: [1, '…', 96, 97, 98, 99, 100]},
                { current: 99, values: [1, '…', 96, 97, 98, 99, 100]},
                { current: 0, values: [1, 2, 3, 4, 5, '…', 100]},
                { current: 4, values: [1, 2, 3, 4, 5, '…', 100]},
                { current: 49, values: [1, '…', 49 , 50 , 51 , '…', 100]}
            ];
            results.forEach(r => {
                it('should display values when current page is ' + r.current, () => {
                    comp.currentPage = r.current;
                    res = calculateValues(pagerSize);
                    expect(res).toEqual(r.values);
                });
            });
        });

        describe ('even array', () => {
            const pagerSize = 6;
            let res: Array<string | number> = [];
            beforeEach (() => {
                comp.pagerSize = pagerSize;
                mockTotalPages.mockImplementation(() => 100);
            });
            const results = [
                { current: 96, values: [1, '…', 97, 98, 99, 100]},
                { current: 99, values: [1, '…', 97, 98, 99, 100]},
                { current: 0, values: [1, 2, 3, 4, '…', 100]},
                { current: 3, values: [1, 2, 3, 4, '…', 100]},
                { current: 49, values: [1, '…', 50 , 51 , '…', 100]}
            ];
            results.forEach(r => {
                it('should display values when current page is ' + r.current, () => {
                    comp.currentPage = r.current;
                    res = calculateValues(pagerSize);
                    expect(res).toEqual(r.values);
                });
            });
        });

        describe ('small array', () => {
            const pagerSize = 3;
            let res: Array<string | number> = [];
            beforeEach (() => {
                comp.pagerSize = pagerSize;
                mockTotalPages.mockImplementation(() => 100);
            });
            const results = [
                { current: 98, values: [98, 99, 100]},
                { current: 99, values: [98, 99, 100]},
                { current: 0, values: [1, 2, 3]},
                { current: 1, values: [1, 2, 3]},
                { current: 49, values: [49 , 50 , 51]}
            ];
            results.forEach(r => {
                it('should display values when current page is ' + r.current, () => {
                    comp.currentPage = r.current;
                    res = calculateValues(pagerSize);
                    expect(res).toEqual(r.values);
                });
            });
        });

    });

    describe('Snapshots', () => {

        it ('should have page numbers and active pages', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 500, height: 100};
            });
            let element = await window.load({
                components: [YooPaginationComponent],
                html: '<yoo-pagination total-items="100" items-per-page="10" current-page="3" class="dark"></yoo-pagination></yoo-pagination>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('should have small pager', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 150, height: 100};
            });
            let element = await window.load({
                components: [YooPaginationComponent],
                html: '<yoo-pagination total-items="100" items-per-page="10" current-page="3" show-total="true" class="dark"></yoo-pagination></yoo-pagination>'
            });
            expect(element).toMatchSnapshot();
        });

        it ('should have total shown', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 1000, height: 100};
            });
            let element = await window.load({
                components: [YooPaginationComponent],
                html: '<yoo-pagination total-items="50" items-per-page="10" current-page="3" class="dark"></yoo-pagination></yoo-pagination>'
            });
            expect(element).toMatchSnapshot();
        });

    });

  describe('events', () => {
    let element, res, emitEvent;
    beforeEach( async () => {
      mockDimensions.mockImplementation(() => {
        return {width: 500, height: 100};
      });
      window = new TestWindow();
      emitEvent = jest.fn(ev => { res = ev.detail; });
    });
    it ('should emit pageChanged on click', async () => {
      element = await window.load({
        components: [YooPaginationComponent],
        html: ` <yoo-pagination total-items="100" items-per-page="10" current-page="0" class="dark"></yoo-pagination>`
      });
      window.document.addEventListener('pageChanged', emitEvent);
      let activePage = element.querySelector('.active');
      expect(activePage.textContent).toEqual('1');
      let moveRight = element.querySelector('.yo-right');
      await moveRight.click();
      expect(emitEvent).toHaveBeenCalled();
      expect(res).toEqual(1);
    });
    it ('should emit itemsPerPageChanged on click', async () => {
      element = new YooPaginationComponent();
      element.itemsPerPageChanged = {
          emit: () => {}
      };
      const changedSpy = jest.spyOn(element.itemsPerPageChanged, 'emit');
      element.updateItemsPerPage(24);
      expect(changedSpy).toHaveBeenCalledWith(24);
    });
  });

});
