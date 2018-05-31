import { TestWindow } from '@stencil/core/testing';
import { YooProfileComponent } from './profile';

describe('YooProfileComponent', () => {
    const data = {
        user: { firstName: 'Cecilia', lastName: 'Adams', role: 'Store Manager', imageData: 'https://res.cloudinary.com/www-yoobic-com/image/upload/w_1020,h_480,c_fill,q_auto:low,f_auto,fl_lossy/a_exif/v1522152485/k7dedr96ainrdhmkzlgj.png' }, // might have to change the names
        links: [{
            title: 'More',
            items: [
                {
                    title: 'Documents',
                    handler: () => { alert('Documents'); }
                },
                {
                    title: 'Contacts',
                    handler: () => { alert('Contacts'); }
                },
                {
                    title: 'Notes',
                    handler: () => { alert('Notes'); }
                }
            ]
        },
        {
            title: 'Get started',
            items: [
                {
                    title: 'What\'s New?',
                    handler: () => { }
                },
                {
                    title: 'Walkthrough',
                    handler: () => { }
                }
            ]
        },
        {
            title: 'Support & Preferences',
            items: [
                {
                    title: 'Settings',
                    handler: () => { }
                },
                {
                    title: 'Help Center',
                    handler: () => { }
                },
                {
                    title: 'Terms & Conditions',
                    handler: () => { }
                }
            ]
        }
        ],
        logoutText: 'Log Out',
        hideLogout: false
    };
    it('should build', () => {
        expect(new YooProfileComponent()).toBeTruthy();
    });

    describe('Rendering', () => {
        let element, window;
        beforeEach(async () => {
            window = new TestWindow();
        });
        it('Should render', async () => {
            element = await window.load({
                components: [YooProfileComponent],
                html: '<yoo-profile></yoo-profile>'
            });
            expect(element).toMatchSnapshot();
        });
        it('Should render with config', async () => {
            element = await window.load({
                components: [YooProfileComponent],
                html: '<yoo-profile></yoo-profile>'
            });
            element.config = data;
            await window.flush();
            expect(element).toMatchSnapshot();
        });
    });
    describe('Events', () => {
        let element, emitEvent, window, res;
        beforeEach(async () => {
            window = new TestWindow();
            emitEvent = jest.fn(ev => { res = ev.detail; });
            element = await window.load({
                components: [YooProfileComponent],
                html: '<yoo-profile></yoo-profile>'
            });
            element.config = data;
            await window.flush();
        });
        xit ('should emit profileEdit on Listen', async () => {
            window.document.addEventListener('profileEdit', emitEvent);
            //todo
            expect(emitEvent).toHaveBeenCalled();
            expect(res).toEqual(true);
        });
        it('should emit clicked on click', async () => {
            window.document.addEventListener('clicked', emitEvent);
            let item = element.querySelector('.profile-links-menu-item');
            await item.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(res.title).toEqual('Documents');
        });
        it('should emit logout on click', async () => {
            window.document.addEventListener('logout', emitEvent);
            let logout = element.querySelector('.profile-logout');
            await logout.click();
            expect(emitEvent).toHaveBeenCalled();
            expect(res).toEqual(true);
        });
    });
});