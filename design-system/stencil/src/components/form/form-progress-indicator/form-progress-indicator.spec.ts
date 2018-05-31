import { TestWindow } from '@stencil/core/testing';

let mockDimensions = jest.fn();
jest.mock('../../../utils/helpers', () => {
    return {
        getElementDimensions: mockDimensions
    };
});
import { YooFormProgressIndicatorComponent } from './form-progress-indicator';

describe('YooFormProgressIndicatorComponent', () => {
    let window;
    beforeEach(() => {
      window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooFormProgressIndicatorComponent()).toBeTruthy();
    });

    describe('Status Rendering', () => {
        beforeEach( async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 1000, height: 100};
            });
        });
        it('Should have progress steps', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator></yoo-form-progress-indicator>'
            });
            element.steps = ['Step 1', 'Step 2'];
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should have a current step', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator current-step=1></yoo-form-progress-indicator>'
            });
            element.steps = ['Step 1', 'Step 2'];
            await window.flush();
            expect(element).toMatchSnapshot();
        });
        it('Should be fully completed', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator is-completed="true"></yoo-form-progress-indicator>'
            });
            expect(element).toMatchSnapshot();
        });
    });

    describe('Step rendering', async () => {
        beforeEach( async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 1000, height: 100};
            });
        });
        it('Should render the correct number of steps', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator current-step=1></yoo-form-progress-indicator>'
            });
            element.steps = ['Step 1', 'Step 2'];
            await window.flush();
            expect(element.getElementsByClassName('step-container')).toHaveLength(2);
            expect(element).toMatchSnapshot();
        });
        it('Should only render a maximum of 7 step-containers', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator current-step=1></yoo-form-progress-indicator>'
            });
            element.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step7', 'Step 8'];
            await window.flush();
            expect(element.getElementsByClassName('step-container')).toHaveLength(7);
            expect(element).toMatchSnapshot();
        });
        it('Should be completed after toggling the completed flag', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator></yoo-form-progress-indicator>'
            });
            expect(element.isCompleted).toBeFalsy();
            element.steps = ['Step 1', 'Step 2'];
            element.isCompleted = true;
            await window.flush();
            expect(element.getElementsByClassName('completed')).toHaveLength(2);
            expect(element).toMatchSnapshot();
        });
        it('Should be completed after toggling the completed flag and while having more than 7 items', async () => {
            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator></yoo-form-progress-indicator>'
            });
            expect(element.isCompleted).toBeFalsy();
            element.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step7', 'Step 8'];
            element.isCompleted = true;
            await window.flush();
            expect(element.getElementsByClassName('completed')).toHaveLength(7);
            expect(element).toMatchSnapshot();
        });
    });

    describe('Step rendering according to parent', async () => {
        it('Should render less steps', async () => {
            mockDimensions.mockImplementation(() => {
                return {width: 200, height: 100};
            });

            let element = await window.load({
                components: [YooFormProgressIndicatorComponent],
                html: '<yoo-form-progress-indicator current-step=1></yoo-form-progress-indicator>'
            });
            element.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step7', 'Step 8'];
            await window.flush();
            expect(element.getElementsByClassName('step-container')).toHaveLength(2);

            expect(element).toMatchSnapshot();
        });
    });

  describe('events', () => {
    let element, res, emitEvent;
    beforeEach( async () => {
      mockDimensions.mockImplementation(() => {
        return {width: 200, height: 100};
      });

      element = await window.load({
        components: [YooFormProgressIndicatorComponent],
        html: '<yoo-form-progress-indicator current-step=1></yoo-form-progress-indicator>'
      });
      element.steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step7', 'Step 8'];
      await window.flush();
      emitEvent = jest.fn(ev => { res = ev.detail; });
    });
    it ('should emit stepSelected on click', async () => {
      window.document.addEventListener('stepSelected', emitEvent);
      let span = element.querySelector('.context-container > span');
      await span.click();
      expect(emitEvent).toHaveBeenCalled();
      expect(res).toEqual(element.steps[0]);
      // expect(emitEvent).toHaveEventData([element.steps[0]]);
    });
  });
});
