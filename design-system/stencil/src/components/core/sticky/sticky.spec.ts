import { TestWindow } from '@stencil/core/testing';
import { YooStickyComponent } from './sticky';

//ToDo What if passed with 0 tabs?
//ToDo What if selected tab is in dropdown?
//ToDo What if tab names do not match slot names? (use index instead? )

describe('YooTabsComponent', () => {
    it('should build', () => {
        expect(new YooStickyComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it('Should render', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooStickyComponent],
                html: `<yoo-sticky></yoo-sticky>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should render with a slot', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooStickyComponent],
                html: ` <yoo-sticky>
                            <div >
                                <span>Sticky Slot</span>
                            </div>
                        </yoo-sticky>`
            });
            expect(element).toMatchSnapshot();
        });

        it('Should render with top and bot prop', async () => {
            let window = new TestWindow();
          let element = await window.load({
                components: [YooStickyComponent],
                html: ` <yoo-sticky top="0px" bottom="40%">
                            <div >
                                <span>Sticky Slot</span>
                            </div>
                        </yoo-sticky>`
            });
            expect(element.top).toEqual('0px');
            expect(element.bottom).toEqual('40%');
        });

    });

});
