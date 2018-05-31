import { Injectable, OnInit } from '@angular/core';

import { INavBarTab, Filter  } from '@shared/interfaces';
import { Channels, Channel, ChannelInterface } from '@shared/data-live';

import { BasePageBaseComponent } from '../base-page/base-page.component';

@Injectable()
export class ChatsPageBaseComponent extends BasePageBaseComponent implements OnInit {
    public tabs: Array<INavBarTab>;
    public selectedTab: INavBarTab;
    public directHiddenFilters: Filter;
    public directMapTransform: any;
    public teamHiddenFilters: Filter;
    public teamMapTransform: any;
    public params: any;

    protected channelBroker: Channel;

    initExtraProviders() {
        super.initExtraProviders();
        this.channelBroker = this.injector.get<Channel>(Channel);
    }

    ngOnInit() {
        super.ngOnInit();
        this.params = {value: 'trigger', params: {enter: 'translateX(100%)', leave: 'translateX(-100%)'}};
        this.tabs = [
            { title: this.translate.get('DIRECT'), value: 'direct' },
            { title: this.translate.get('TEAM'), value: 'team' }
        ];
        this.selectedTab = this.tabs[0];

        this.directHiddenFilters = this.channelBroker.getFilter(this.session.user, null, this.authentication.isAdmin(true));
        this.directMapTransform = this.channelBroker.getTransformChannel(this.session.user._id);

        this.teamHiddenFilters = this.authentication.isAdmin(true) ? null : this.channelBroker.getChannelsFilter(this.session.user);
        this.teamMapTransform = this.channelBroker.getTransformChannels(this.session.user._id);

    }

    onTabSelected(ev: { detail: INavBarTab }) {
        this.selectedTab = ev.detail;
    }

    onTabSelectedIsToRight(ev: {detail: boolean}) {
        this.params = ev.detail ? {value: 'trigger', params: {enter: 'translateX(100%)', leave: 'translateX(-100%)'}} : {value: 'trigger', params: {enter: 'translateX(-100%)', leave: 'translateX(100%)'}};
    }

    onChatSelect(channel: ChannelInterface) {
        this.utils.showChatByChannel(channel);
    }

    onChannelSelect(channel: Channels) {

    }
}
