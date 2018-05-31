import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import { DataCoreModule } from '@shared/data-core';
//import { DATA_LIVE_PROVIDERS } from './services';
import { Channel } from './services/channel/channel.service';
import { Intercom } from './services/intercom/intercom.service';
import { Messages } from './services/messages/messages.service';
import { Pubnub } from './services/pubnub/pubnub.service';
import { Track } from './services/track/track.service';
import { TwilioToken } from './services/twilio-token/twilio-token.service';
import { RavenErrorHandler } from './services/raven-error-handler/raven-error-handler.service';

import { Intercom as IntercomNative } from '@ionic-native/intercom/ngx';

@NgModule({
    declarations: [],
    imports: [DataCoreModule],
    exports: [DataCoreModule]
})
export class DataLiveModule {
    static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
        return {
            ngModule: DataLiveModule,
            providers: [
                ...configuredProviders,
                Channel,
                Intercom,
                Messages,
                Pubnub,
                TwilioToken,
                Track,
                RavenErrorHandler,
                IntercomNative
            ]
        };
    }
}
