import { Injectable } from '@angular/core';
//import { User } from '../../interfaces/user/user.interface';
import { Currency } from '../../interfaces/currency/currency.interface';
import { Location } from '../../interfaces/location/location.interface';
import { MissionDescription } from '../../interfaces/mission-description/mission-description.interface';
import { Persistent, LocalForageService } from '@shared/common';

@Injectable()
export class Session {

    //@Persistent('session.token')
    public token: string;
    //@Persistent('session.user')
    public user: any;
    //@Persistent('session.userId')
    public userId: string;
    //@Persistent('session.currencies')
    public currencies: Array<Currency>;
    //@Persistent('session.groups')
    public groups: Array<string>;
    //@Persistent('session.roles')
    public roles: Array<string>;

    public tenantName?: string;
    public tenantRef?: string;

    @Persistent('login.hideWalkthrough') public hideWalkthrough: boolean;

    public openedChannels: Array<string> = [];

    public selectedMissionDescription: MissionDescription = null;
    public selectedLocation: Location = null;

    constructor(protected localForage: LocalForageService) { }

    clear(clearUser = true) {
        if (clearUser) {
            this.token = '';
            this.user = null;
            this.userId = null;
            this.tenantName = null;
            this.tenantRef = null;
            this.currencies = [];
            this.groups = [];
            this.roles = [];
            this.hideWalkthrough = false;
        }
        return Promise.resolve();
    }
}
