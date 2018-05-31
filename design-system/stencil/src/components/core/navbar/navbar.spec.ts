import { TestWindow } from '@stencil/core/testing';
jest.useFakeTimers();

let mockDimensions = jest.fn();
jest.mock('../../../utils/helpers', () => {
    return {
        getElementDimensions: mockDimensions
    };
});

import { YooNavbarComponent } from './navbar';


describe('YooNavbarComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooNavbarComponent()).toBeTruthy();
    });

    describe('Rendering ', () => {
        it('Should render', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 2000, height: 100};
            });
            let element = await window.load({
                components: [YooNavbarComponent],
                html: '<yoo-navbar></yoo-navbarr>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should have three titles', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 500, height: 100};
            });
            let element = await window.load({
                components: [YooNavbarComponent],
                html: '<yoo-navbar class="success"></yoo-navbar>'
            });
            element.tabs = [
                { title: 'Section 1', value: 'section1' },
                { title: 'Section 2', value: 'section2' },
                { title: 'Section 3', value: 'section3' },
                { title: 'Section 4', value: 'section4' }
            ];
            await window.flush(element);
            expect(element).toMatchSnapshot();
        });

        it('Should have five titles and active title', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 500, height: 100};
            });
            let element = await window.load({
                components: [YooNavbarComponent],
                html: '<yoo-navbar class="success"></yoo-navbar>'
            });
             element.tabs = [
                { title: 'Section 1', value: 'section1' },
                { title: 'Section 2', value: 'section2' },
                { title: 'Section 3', value: 'section3' },
                { title: 'Section 4', value: 'section4' },
                { title: 'Section 5', value: 'section5' }
            ];
            element.initialTab = { title: 'Section 1', value: 'section1' };
            await window.flush(element);
            expect(element).toMatchSnapshot();
            expect(element.tabs).toHaveLength(5);
            expect(element.initialTab).toEqual({title: 'Section 1', value: 'section1'});
        });
    });

    describe('Methods', () => {

        it('It should have 5 visibile items', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 1000, height: 100};
            });
            let comp = new YooNavbarComponent();
            comp.tabs = [
                { title: 'Section 1', value: 'section1' },
                { title: 'Section 2', value: 'section2' },
                { title: 'Section 3', value: 'section3' },
                { title: 'Section 4', value: 'section4' },
                { title: 'Section 5', value: 'section5' }
            ];
            expect(comp.numberOfVisibileItems).toEqual(5);

        });

        it('It should have 2 visibile items and show dropdown', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 299, height: 100};
            });
            let comp = new YooNavbarComponent();
            comp.tabs = [
                { title: 'Section 1', value: 'section1' },
                { title: 'Section 2', value: 'section2' },
                { title: 'Section 3', value: 'section3' },
                { title: 'Section 4', value: 'section4' },
                { title: 'Section 5', value: 'section5' }
            ];
            comp.totalElementWidthArray = [100, 200, 300, 400, 500];
            comp.resizePage();
            expect(comp.numberOfVisibileItems).toEqual(2);
            expect(comp.showDropdown).toEqual(true);

        });
    });

    describe('Events', () => {
        let comp = new YooNavbarComponent();
            comp.tabSelected = {
                emit: () => {}
            };
            comp.actionButtonClicked = {
                emit: () => {}
            };

        xit('Should emit event on tab click', async () => {
            const tabSelectedSpy = jest.spyOn(comp.tabSelected, 'emit');
            comp.tabs = [
                { title: 'Section 1', value: 'section1' },
                { title: 'Section 2', value: 'section2' },
                { title: 'Section 3', value: 'section3' },
                { title: 'Section 4', value: 'section4' },
                { title: 'Section 5', value: 'section5' }
            ];
            comp.onSelectTab({title: 'Section 2', value: 'section2'}, 1);
            jest.runOnlyPendingTimers();
            expect(tabSelectedSpy).toHaveBeenCalledWith({title: 'Section 2', value: 'section2'});
        });

        it('Should emit event on action button click', async () => {
            const actionButtonSpy = jest.spyOn(comp.actionButtonClicked, 'emit');
            comp.tabs = [
                { title: 'Section 1', value: 'section1' },
                { title: 'Section 2', value: 'section2' },
                { title: 'Section 3', value: 'section3' },
                { title: 'Section 4', value: 'section4' },
                { title: 'Section 5', value: 'section5' }
            ];
            comp.actionBtnText = 'Button';
            comp.actionBtnClicked();
            expect(actionButtonSpy).toHaveBeenCalledWith(true);
        });
    });
});
