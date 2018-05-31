import { TestWindow } from '@stencil/core/testing';
import { YooResetPasswordComponent } from './reset-password';

fdescribe('YooResetPasswordComponent', () => {
    let window;
    beforeEach(() => {
        window = new TestWindow();
    });
    it('should build', () => {
        expect(new YooResetPasswordComponent()).toBeTruthy();
    });

    describe('Rendering', () => {

       it('should render with heading', async () => {
            let element = await window.load({
                components: [YooResetPasswordComponent],
                html: '<yoo-reset-password heading="title"></yoo-reset-password>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render with subheading', async () => {
            let element = await window.load({
                components: [YooResetPasswordComponent],
                html: '<yoo-reset-password subheading="subtitle"></yoo-reset-password>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render with border class', async () => {
            let element = await window.load({
                components: [YooResetPasswordComponent],
                html: '<yoo-reset-password border-class="success"></yoo-reset-password>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render with button class', async () => {
            let element = await window.load({
                components: [YooResetPasswordComponent],
                html: '<yoo-reset-password button-class="success"></yoo-reset-password>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render with button text', async () => {
            let element = await window.load({
                components: [YooResetPasswordComponent],
                html: '<yoo-reset-password button-text="submit"></yoo-reset-password>'
            });
            expect(element).toMatchSnapshot();
        });

        it('should render with input label', async () => {
            let element = await window.load({
                components: [YooResetPasswordComponent],
                html: '<yoo-reset-password input-label="email"></yoo-reset-password>'
            });
            expect(element).toMatchSnapshot();
        });

    });

    describe('Events', () => {
        let element = new YooResetPasswordComponent();
        element.passwordResetRequestSubmitted = {
            emit: () => {}
        };
        it('should emit event on submit', async () => {
            const passwordRequestSpy = jest.spyOn(element.passwordResetRequestSubmitted, 'emit');
            element.onSubmit();
            expect(passwordRequestSpy).toHaveBeenCalled();
        });
    });
});