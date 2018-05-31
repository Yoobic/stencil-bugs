import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //, HTTP_INTERCEPTORS

import { CommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';

//import { DATA_PROVIDERS } from './services'; //HttpCustomInterceptor, Config
import { Algorithms } from './services/algorithms/algorithms.service';
import { Authentication } from './services/authentication/authentication.service';
import { AuthenticationGuard, CanDeactivateGuard } from './services/authentication/authentication.guard';
import { BackupService } from './services/backup/backup.service';
import { Box } from './services/box/box.service';
import { Blog } from './services/blog/blog.service';
import { Broker } from './services/broker/broker.service';
import { Config } from './services/config/config.service';
import { CurrentSessionResolver } from './services/authentication/current-session.resolver';
import { Dashboard } from './services/dashboard/dashboard.service';
import { Files } from './services/files/files.service';
import { FilesBroker } from './services/files/files-broker.service';
import { Googlemaps } from './services/googlemaps/googlemaps.service';
import { Googletranslate } from './services/googletranslate/googletranslate.service';
import { HttpCustomInterceptor } from './services/http-interceptor/http-interceptor.service';
import { LinksService } from './services/links/links.service';
import { LoadingBar } from './services/loading-bar/loading-bar.service';
import { Locations } from './services/locations/locations.service';
import { Loopback } from './services/loopback/loopback.service';
import { Models } from './services/models/models.service';
import { Print } from './services/print/print.service';
import { Push } from './services/push/push.service';
import { Requestor } from './services/requestor/requestor.service';
import { Security } from './services/security/security.service';
import { Session } from './services/session/session.service';
import { Smartloc } from './services/smartloc/smartloc.service';
import { Users } from './services/users/users.service';
import { Version } from './services/version/version.service';
import { Workplace } from './services/workplace/workplace.service';
import { Xlsx } from './services/xlsx/xlsx.service';
let SERVICES = [
    Algorithms,
    Authentication,
    AuthenticationGuard,
    BackupService,
    Box,
    Blog,
    Broker,
    CanDeactivateGuard,
    Config,
    CurrentSessionResolver,
    Dashboard,
    Files,
    FilesBroker,
    Googlemaps,
    Googletranslate,
    HttpCustomInterceptor,
    LinksService,
    LoadingBar,
    Locations,
    Loopback,
    Models,
    Print,
    Push,
    Requestor,
    Security,
    Session,
    Smartloc,
    Users,
    Version,
    Workplace,
    Xlsx
];
//import { DATA_PIPES } from './pipes';
import { AuthorizedPipe } from './pipes/authorized/authorized.pipe';
import { CurrencyPipe } from './pipes/currency/currency.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { UsernamePipe } from './pipes/username/username.pipe';
import { UseremailPipe } from './pipes/useremail/useremail.pipe';
import { UserinitialPipe } from './pipes/userinitial/userinitial.pipe';
let PIPES = [AuthorizedPipe,
    CurrencyPipe,
    FilterPipe,
    UsernamePipe,
    UseremailPipe,
    UserinitialPipe];

import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Push as PushNative } from '@ionic-native/push/ngx';

@NgModule({
    declarations: [
        ...PIPES
    ],
    imports: [CommonModule, TranslateModule, HttpClientModule],
    exports: [CommonModule, TranslateModule, HttpClientModule,
        ...PIPES
    ]
})
export class DataCoreModule {
    static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
        return {
            ngModule: DataCoreModule,
            providers: [
                ...SERVICES,
                ...configuredProviders,
                FileTransfer,
                Device,
                FileOpener,
                OneSignal,
                PushNative,
                FileNative
            ]
        };
    }
}
