import { TestWindow } from '@stencil/core/testing';
import { YooCardStickyComponent } from './card-sticky';
import { YooButtonComponent } from '../../core/button/button';

describe('CardTopComponent', () => {
    it('should build', () => {
        expect(new YooCardStickyComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach( async () => {
            window = new TestWindow();
            element = await window.load({
                components: [YooCardStickyComponent, YooButtonComponent],
                html: '<yoo-card-sticky></yoo-card-sticky>'
            });
        });

        it ('Should render', async () => {
            expect(element).toMatchSnapshot();
        });

        it ('Should render with an entry', async () => {
            element.entry = {
                category: 'CAREERS',
                title: 'Job Interview? Here\'s what to do',
                buttonText: 'Read More',
                handler: () => {},
                imgSrc: 'https://images.unsplash.com/photo-1481905997796-447b27c82b80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c29ff4b605cdb0ab24fd7346ab440a5&auto=format&fit=crop&w=1050&q=80'
            };
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });

    describe('Events', () => {

        let emitEvent, window;
        beforeEach( async () => {
            window = new TestWindow();
            emitEvent = jest.fn();
        });

        it('Should call the handler when the button is clicked', async () => {
            let element = await window.load({
                components: [YooCardStickyComponent, YooButtonComponent],
                html: '<yoo-card-sticky></yoo-card-sticky>'
            });
            let handler = jest.fn();
            element.entry = {
                category: 'CAREERS',
                title: 'Job Interview? Here\'s what to do',
                buttonText: 'Read More',
                handler: handler,
                imgSrc: 'https://images.unsplash.com/photo-1481905997796-447b27c82b80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c29ff4b605cdb0ab24fd7346ab440a5&auto=format&fit=crop&w=1050&q=80'
            };
            await window.flush();
            let button = element.querySelector('yoo-button button');
            await button.click();
            expect(handler).toHaveBeenCalled();
        });
    });
});