export interface PubnubEvent {
    presence?: PresenceEvent;
    message?: MessageEvent;
    status?: StatusEvent;
}

export const PN_STATUS_CATEGORIES = {
    up: 'PNNetworkUpCategory',
    down: 'PNNetworkDownCategory',
    issues: 'PNNetworkIssuesCategory',
    reconnected: 'PNReconnectedCategory',
    connected: 'PNConnectedCategory'
};

export interface PresenceEvent {
    action?: string;
    uuid?: string;
    timestamp?: number;
    occupancy?: number;
    state?: any;
    channel?: string;
    subscription?: string;
    timetoken?: number;
    userMetadata?: any;
    join?: Array<string>;
    timedout?: Array<string>;
    leave?: Array<string>;
    here_now_refresh?: boolean;
}

export interface MessageEvent {
    message?: any;
    channel?: string;
    subscription?: string;
    timetoken?: number;
    userMetadata?: any;
}

export interface StatusEvent {
    error?: boolean;
    statusCode?: number;
    category?: string;
    errorData?: any;
    // send back channel, channel groups that were affected by this operation
    affectedChannels?: Array<string>;
    affectedChannelGroups?: Array<string>;
}

export interface Listener {
    message?(p: MessageEvent): any;
    presence?(p: PresenceEvent): any;
    status?(p: StatusEvent): any;
}

export interface HistoryArguments {
    channel: string; // fetch history from a channel
    start?: number; // start timetoken for history fetching
    end?: number; // end timetoken for history feting
    includeTimetoken?: boolean; // include time token for each history call
    reverse?: boolean;
    count?: number;
}

export interface HistoryItem {
    timetoken?: number;
    entry?: any;
}

export interface HistoryResponse {
    messages?: Array<HistoryItem>;
    startTimeToken?: number;
    endTimeToken?: number;
}

export interface LeaveArguments {
    channels: Array<string>;
    channelGroups: Array<string>;
}

export interface HereNowArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    includeUUIDs?: boolean;
    includeState?: boolean;
}

// export interface ChannelState {
//   [key: string]: string | number;
// }
export type ChannelState = any;

export interface GlobalState {
    [channelName: string]: ChannelState;
}

export interface UUIDState<T> {
    uuid: string;
    state: T;
}

export interface ChannelStatus<T> {
    occupants?: Array<T>;
    occupancy: number;
}

export interface HereNowResponse<T> {
    totalChannels?: number;
    totalOccupancy?: number;
    channels?: {
        [channelName: string]: ChannelStatus<T>
    };
    uuids?: Array<T>;
}

export interface WhereNowArguments {
    uuid?: string;
}

export interface WhereNowResponse {
    channels: Array<string>;
}

export interface SubscribeArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    withPresence?: boolean;
    timetoken?: number;
}

export interface UnsubscribeArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
}

export interface GetStateArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    uuid?: string;
}

export interface SetStateArguments {
    channels?: Array<string>;
    channelGroups?: Array<string>;
    uuid?: string;
    state?: {
        [key: string]: string | number
    };
}

export interface GetStateResponse {
    channels?: GlobalState;
}

export interface SetStateResponse {
    state?: GlobalState;
}

// publish

export interface PublishResponse {
    timetoken: number;
}

export interface PublishArguments {
    message: any; // the contents of the dispatch
    channel?: string; // the destination of our dispatch
    sendByPost?: boolean; // use POST when dispatching the message
    storeInHistory?: boolean; // store the published message in remote history
    meta?: any; // psv2 supports filtering by metadata
}

export interface ProxySetup {
    port: number;
    hostname: string;
    headers: {
        [header: string]: any
    };
}

export interface PubNubSetup {
    publishKey?: string; // API key required for publishing
    subscribeKey: string; // API key required to subscribe
    cipherKey?: string; // decryption keys
    origin?: string; // an optional FQDN which will recieve calls from the SDK.
    ssl?: boolean; // is SSL enabled?
    shutdown?: () => any; // function to call when pubnub is shutting down.

    uuid?: string; // Optional uuid to set custom uuid

    sendBeacon?: (url: string) => any; // executes a call against the Beacon API
    useSendBeacon?: boolean; // enable, disable usage of send beacons

    subscribeRequestTimeout?: number; // how long to wait for subscribe requst
    transactionalRequestTimeout?: number; // how long to wait for transactional requests

    proxy?: ProxySetup; // configuration to support proxy settings.

    suppressLev?: boolean;

    // get / set implementation to store data
    db?: {
        get: (key: string) => any;
        set: (key: string, data: any) => void;
    };
}

export interface Push {
    addChannels(args: { channels: Array<string>, device: string, pushGateway: string }, cb?: (status: StatusEvent) => any);
    removeChannels(args: { channels: Array<string>, device: string, pushGateway: string }, cb?: (status: StatusEvent) => any);
    listChannels(args: { device: string, pushGateway: string }, cb?: (status: StatusEvent, response: { channels: Array<string> }) => any);
    deleteDevice(args: { device: string, pushGateway: string }, cb?: (status: StatusEvent) => any);
}

export interface IPubNub {
    push: Push;
    // new(setup: PubNubSetup): IPubNub;
    // uuid
    setUUID(uuid: string): void;
    getUUID(): string;
    generateUUID(): string;
    // auth
    setAuthKey(authKey: string);
    // publish/subscribe/unsubscribe
    publish(args: { message: any, channel?: string, sendByPost?: boolean, storeInHistory?: boolean, meta?: any }, cb?: (r: { timetoken: number }) => any);
    subscribe(args: { channels?: Array<string>, channelGroups?: Array<string>, withPresence?: boolean, timetoken?: number });
    unsubscribe(args: { channels?: Array<string>, channelGroups?: Array<string> });
    unsubscribeAll(): void;
    // listeners
    addListener(l: Listener);
    removeListener(l: Listener);
    removeAllListeners();
    // presence
    // hereNow(args: HereNowArguments, cb?: (status: StatusEvent, response: HereNowResponse) => any);
    hereNow(args: { channels?: Array<string>, channelGroups?: Array<string>, includeUUIDs?: boolean }, cb?: (status: StatusEvent, response: HereNowResponse<string>) => any);
    hereNow(args: { channels?: Array<string>, channelGroups?: Array<string>, includeUUIDs?: boolean }): Promise<HereNowResponse<string>>;
    hereNow(args: { channels?: Array<string>, channelGroups?: Array<string>, includeUUIDs?: boolean, includeState: boolean }, cb?: (status: StatusEvent, response: HereNowResponse<UUIDState<GlobalState>>) => any);
    hereNow(args: { channels?: Array<string>, channelGroups?: Array<string>, includeUUIDs?: boolean, includeState: boolean }): Promise<HereNowResponse<UUIDState<GlobalState>>>;
    whereNow(args: WhereNowArguments, cb?: (status: StatusEvent, response: WhereNowResponse) => any);
    whereNow(args: WhereNowArguments): Promise<WhereNowResponse>;
    getState(args: GetStateArguments, cb?: (status: StatusEvent, response: GetStateResponse) => any);
    getState(args: GetStateArguments): Promise<GetStateResponse>;
    setState(args: SetStateArguments, cb?: (status: StatusEvent, response: SetStateResponse) => any);
    setState(args: SetStateArguments): Promise<SetStateResponse>;
    // PAM & groups not used
    // history
    history(args: HistoryArguments, cb?: (status: StatusEvent, response: HistoryResponse) => any);
    history(args: HistoryArguments): Promise<HistoryResponse>;
    stop(): void;
}
