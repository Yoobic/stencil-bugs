import { TestWindow } from '@stencil/core/testing';
import { YooEntityComponent } from './entity';

describe('YooEntityComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
        (global as any).translateService = {
            polyglot: () => {},
            get: () => {}
        };
    });
    it('should build', () => {
        expect(new YooEntityComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        it('Should render', async () => {
            let element = await window.load({
                components: [YooEntityComponent],
                html: '<yoo-entity></yoo-entity>'
            });
            expect(element).toMatchSnapshot();
        });

        it('Should render with item', async () => {
            let element = await window.load({
                components: [YooEntityComponent],
                html: '<yoo-entity></yoo-entity>'
            });
            element.item = { title: 'Title', text: 'Hola Text', background: { _downloadURL: 'https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA17563_hires.jpg' } };
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });
});