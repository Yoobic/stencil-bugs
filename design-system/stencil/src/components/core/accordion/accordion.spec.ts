import { TestWindow } from '@stencil/core/testing';
import { YooAccordionComponent } from './accordion';

describe('YooAccordionComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooAccordionComponent()).toBeTruthy();
    });

    describe('Snapshots', () => {
        it ('should have headings containers', async () => {
            let element;
            element = await window.load ({
                components: [YooAccordionComponent],
                html: '<yoo-accordion></yoo-accordion>'
            });
            expect(element).toMatchSnapshot();
        });

          it ('should render slot', async () => {
            let element;
            element = await window.load ({
                components: [YooAccordionComponent],
                html: '<yoo-accordion><div slot="accordion1">hi</div><div slot="accordion2">hi2</div></yoo-accordion>'
            });
            expect(element).toMatchSnapshot();
        });

         it ('should display the accordion', async () => {
            let element;
            element = await window.load ({
                components: [YooAccordionComponent],
                html: '<yoo-accordion></yoo-accordion>'
            });
            element.titles = ['accordion1', 'accordion2', 'accordion3', 'accordion4'];
            await window.flush(element);
            expect(element.titles).toEqual(['accordion1', 'accordion2', 'accordion3', 'accordion4']);
            expect(element).toMatchSnapshot();
        });

    });

    describe('rendering', () => {
        let element;
        beforeEach( async () => {
          element = await window.load({
            components: [YooAccordionComponent],
            html: '<yoo-accordion></yoo-accordion>'
          });
        });
        it ('should render', async () => {
            expect(element).toBeTruthy();
        });
    });

    describe('Events', () => {
        it('Should fire an event when the selected accordion change', async () => {
            let element = await window.load ({
                components: [YooAccordionComponent],
                html: '<yoo-accordion></yoo-accordion>'
            });
            element.titles = ['accordion1', 'accordion2', 'accordion3', 'accordion4'];
            await window.flush();

            let titleTab1: HTMLElement = element.querySelector('.accordion-title');
            expect(titleTab1.classList).not.toContain('active-title');

            let emitItem = jest.fn();
            window.document.addEventListener('accordionSelected', emitItem);
            await titleTab1.click();
            expect(emitItem).toHaveEventData(0);
            await window.flush();
            expect(titleTab1.classList).toContain('active-title');
        });
    });

});
