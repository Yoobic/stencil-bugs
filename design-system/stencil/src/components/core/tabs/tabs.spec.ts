import { TestWindow } from '@stencil/core/testing';
import { YooTabsComponent } from './tabs';

//ToDo What if passed with 0 tabs?
//ToDo What if selected tab is in dropdown?
//ToDo What if tab names do not match slot names? (use index instead? )

describe('YooTabsComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooTabsComponent()).toBeTruthy();
    });

    describe('content and titles should display correctly when changed', () => {
        it ('Should display with less than 4 tabs', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: '<yoo-tabs><div slot="tab1">Hey1</div><div slot="tab2">Hey2</div></yoo-tabs>'
              });
              element.titles = ['tab1', 'tab2'];
              element.selected = 0;
              await window.flush(element);
              expect(element).toMatchSnapshot();
              let titles = element.querySelectorAll('.tab-title');
              titles[1].click();
              expect(element).toMatchSnapshot();
        });

        it ('Should display with exactly 4 tabs', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: `
                    <yoo-tabs>
                        <div slot="tab1">Hey1</div>
                        <div slot="tab2">Hey2</div>
                        <div slot="tab3">Hey3</div>
                        <div slot="tab4">Hey4</div>
                    </yoo-tabs>
                `
              });
              element.titles = ['tab1', 'tab2', 'tab3', 'tab4'];
              element.selected = 0;
              await window.flush(element);
              expect(element).toMatchSnapshot();
              let titles = element.querySelectorAll('.tab-title');
              titles[1].click();
              expect(element).toMatchSnapshot();
        });

        it ('Should display with over 4 tabs', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: `
                    <yoo-tabs>
                        <div slot="tab1">Hey1</div>
                        <div slot="tab2">Hey2</div>
                        <div slot="tab3">Hey3</div>
                        <div slot="tab4">Hey4</div>
                        <div slot="tab5">Hey5</div>
                        <div slot="tab6">Hey46</div>
                    </yoo-tabs>
                `
              });
              element.titles = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5', 'tab6'];
              element.selected = 0;
              await window.flush(element);
              expect(element).toMatchSnapshot();
              let titles = element.querySelectorAll('.tab-title');
              titles[1].click();
              expect(element).toMatchSnapshot();
              titles = element.querySelectorAll('.other-title');
              titles[0].click();
              expect(element).toMatchSnapshot();
        });
    });

    describe('should change when props are updated', () => {
        it ('Should change selected item', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: `
                    <yoo-tabs>
                        <div slot="tab1">Hey1</div>
                        <div slot="tab2">Hey2</div>
                        <div slot="tab3">Hey3</div>
                        <div slot="tab4">Hey4</div>
                    </yoo-tabs>
                `
            });
            element.titles = ['tab1', 'tab2', 'tab3', 'tab4'];
            element.selected = 0;
            await window.flush(element);
            expect(element).toMatchSnapshot();
            element.selected = 1;
            await window.flush(element);
            expect(element).toMatchSnapshot();
        });

        it ('Should change visible items', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: `
                    <yoo-tabs>
                        <div slot="tab1">Hey1</div>
                        <div slot="tab2">Hey2</div>
                        <div slot="tab3">Hey3</div>
                        <div slot="tab4">Hey4</div>
                    </yoo-tabs>
                `
            });
            element.titles = ['tab1', 'tab2', 'tab3', 'tab4'];
            await window.flush(element);
            expect(element).toMatchSnapshot();
            element.numberTabsDiplayed = 2;
            await window.flush(element);
            expect(element).toMatchSnapshot();
        });

        it ('Should change tab names', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: `
                    <yoo-tabs>
                        <div slot="tab1">Hey1</div>
                        <div slot="tab2">Hey2</div>
                        <div slot="tab3">Hey3</div>
                        <div slot="tab4">Hey4</div>
                    </yoo-tabs>
                `
            });
            element.titles = ['tab1', 'tab2', 'tab3', 'tab4'];
            await window.flush(element);
            expect(element).toMatchSnapshot();
            element.titles = ['tab1a', 'tab2a', 'tab3', 'tab4'];
            await window.flush(element);
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events should be fired', () => {
        it('Should fire an event when the selected tab change', async () => {
            let element = await window.load({
                components: [YooTabsComponent],
                html: '<yoo-tabs><div slot="tab1">Hey1</div><div slot="tab2">Hey2</div></yoo-tabs>'
            });
            element.titles = ['tab1', 'tab2'];
            element.selected = 1;
            await window.flush();

            let titleTab1: HTMLElement = element.querySelector('.tab-selector > .tab-title');
            expect(titleTab1.classList).not.toContain('active-title');

            let res;
            let emitItem = jest.fn(ev => {res = ev.detail; });
            window.document.addEventListener('tabChanged', emitItem);
            await titleTab1.click();
            expect(emitItem).toHaveBeenCalled();
            expect(res).toEqual('tab1');
            await window.flush();
            expect(titleTab1.classList).toContain('active-title');
        });
    });

});
