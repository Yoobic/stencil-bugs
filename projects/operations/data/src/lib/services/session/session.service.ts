import { Injectable } from '@angular/core';
import { Persistent } from '@shared/common';
import { Session as SessionBase, User, Currency } from '@shared/data-core';
import { Mission } from '../../interfaces/mission/mission.interface';
import { CACHE_KEYS } from '@shared/data-form';

@Injectable()
export class Session extends SessionBase {

    @Persistent('session.token', null, null, true) public token: string;
    @Persistent('session.user', null, null, true) public user: User;
    @Persistent('session.userId', null, null, true) public userId: string;
    @Persistent('session.currencies', null, null, true) public currencies: Array<Currency>;
    @Persistent('session.groups', null, null, true) public groups: Array<string>;
    @Persistent('session.roles', null, null, true) public roles: Array<string>;

    @Persistent('session.locations', null, null, true) public locations: Array<{ _id: string }>;
    @Persistent('session.locationtypes', null, null, true) public locationtypes: Array<{ _id: string }>;
    @Persistent('session.dashboard.campaignprogress', null, null, true) public campaignProgress: Array<any>;
    @Persistent('session.twilioConversationsToken', null, null, true) public twilioConversationsToken: string;

    public selectedMission: Mission;
    public goToMissionForm?: Function;
    public goToMissionAnalysis?: Function;
    public returnToInbox?: boolean;

    clear(clearUser = true) {
        return super.clear(clearUser).then(() => {
            if (clearUser) {
                this.locations = [];
                this.locationtypes = [];
            }
            this.campaignProgress = [];
            this.twilioConversationsToken = '';
            this.selectedMission = null;
            this.selectedMissionDescription = null;
            this.openedChannels = [];

            return this.localForage.remove(CACHE_KEYS.chart);
        });
    }
}
