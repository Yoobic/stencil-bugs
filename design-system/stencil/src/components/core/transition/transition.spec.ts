import { TestWindow } from '@stencil/core/testing';
import { YooTransitionComponent } from './transition';

describe('YooTransitionComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooTransitionComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it('should have a type', async () => {
            let element;
            element = await window.load ({
                components: [YooTransitionComponent],
                html: `<yoo-transition type="fade" class="accent">
                            <div >
                                <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                            </div>
                        </yoo-transition>`
            });
            expect(element).toMatchSnapshot();
        });

        it('should have a heading', async () => {
            let element;
            element = await window.load ({
                components: [YooTransitionComponent],
                html: `<yoo-transition type="fade" heading="TEXT" class="accent">
                            <div >
                                <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                            </div>
                        </yoo-transition>`
            });
            expect(element).toMatchSnapshot();
        });

        it('should have a subheading', async () => {
            let element;
            element = await window.load ({
                components: [YooTransitionComponent],
                html: `<yoo-transition type="heading" heading="TITLE" sub-heading="SUBHEADING" class="accent">
                            <div >
                                <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                            </div>
                        </yoo-transition>`
            });
            expect(element).toMatchSnapshot();
        });

        it('should have an icon', async () => {
            let element;
            element = await window.load ({
                components: [YooTransitionComponent],
                html: `<yoo-transition type="icon" class="accent">
                            <div >
                                <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                            </div>
                        </yoo-transition>`
            });
            expect(element).toMatchSnapshot();
        });

        it('should have an image', async () => {
            let element;
            element = await window.load ({
                components: [YooTransitionComponent],
                html: `<yoo-transition type="image" class="accent">
                            <div >
                                <img src="https://images3.alphacoders.com/823/thumb-1920-82317.jpg" alt="Image" height="200"/>
                            </div>
                        </yoo-transition>`
            });
            expect(element).toMatchSnapshot();
        });
    });
});