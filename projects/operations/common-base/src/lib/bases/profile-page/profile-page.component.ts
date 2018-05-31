import { Injectable, OnInit } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { IProfileConfig } from '@shared/interfaces';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class ProfilePageBaseComponent extends BasePageBaseComponent implements OnInit {
    public config: IProfileConfig;

    ngOnInit() {
        super.ngOnInit();
        this.config = {
            user: this.session.user,
            links: [{
                title: this.translate.get('MORE'),
                items: [
                    { title: this.translate.get('DOCUMENTS'), handler: () => this.onShowDocuments() },
                    { title: this.translate.get('CONTACTS'), handler: () => this.onShowContacts() },
                    { title: this.translate.get('NOTES'), handler: () => this.onShowNotes() }
                ]
            }, {
                title: this.translate.get('GETSTARTED'),
                items: [
                    { title: this.translate.get('WHATSNEW'), handler: () => this.onShowWhatsNew() },
                    { title: this.translate.get('WALKTHROUGH1'), handler: () => this.onShowWalkthrough() }
                ]
            }, {
                title: this.translate.get('SUPPORTANDPREFERENCES'),
                items: [
                    { title: this.translate.get('SETTINGS'), handler: () => this.onShowUserSettings() },
                    { title: this.translate.get('HELP'), handler: () => this.onShowHelpCenter() },
                    { title: this.translate.get('LANGUAGE'), handler: () => this.onChangeLanguage() },
                    { title: this.translate.get('TERMSANDCONDITION'), handler: () => this.onShowTermsAndConditions() },
                    ... this.authentication.isAdmin() ? [
                        { title: this.translate.get('ENVIRONMENT'), handler: () => this.onChangeEnvironment() }
                    ] : []
                ]
            }],
            logoutText: this.translate.get('LOGOUT')
        };
    }

    onShowDocuments() {
        return (this.utils as UtilsService).showDocuments();
    }

    onShowContacts() {
        return (this.utils as UtilsService).showContacts();
    }

    onShowNotes() {
        return (this.utils as UtilsService).showNotes();
    }

    onShowWhatsNew() {
        return this.utils.showWhatsNew();
    }

    onShowWalkthrough() {
        return this.utils.showWalkthrough();
    }

    onShowUserSettings() {
        return (this.utils as UtilsService).showUserSettings();
    }

    onShowHelpCenter() {
        return this.utils.showHelp();
    }

    onShowTermsAndConditions() {
        this.utils.showTermsAndConditions();
    }

    onLoggedOut() {
        this.closeModal();
    }

    onChangeEnvironment() {
        this.utils.changeEnvironment();
    }

    onChangeLanguage() {
        this.utils.changeLanguage();
    }
}
