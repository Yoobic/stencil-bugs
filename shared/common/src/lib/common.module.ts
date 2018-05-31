import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import { COMMON_PIPES } from './pipes';
import { ArrayFromNumberPipe } from './pipes/array-from-number/array-from-number.pipe';
import { CloudinaryPipe } from './pipes/cloudinary/cloudinary.pipe';
import { DateFormatPipe } from './pipes/date-format/date-format.pipe';
import { FileSizePipe } from './pipes/file-size/file-size.pipe';
import { HighlightPipe } from './pipes/highlight/highlight.pipe';
import { HttpsPipe } from './pipes/https/https.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { LimitToPipe } from './pipes/limit-to/limit-to.pipe';
import { MapValuesPipe } from './pipes/map-values/map-values.pipe';
import { NewlinePipe } from './pipes/newline/newline.pipe';
import { NohtmlPipe } from './pipes/nohtml/nohtml.pipe';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { RoundPipe } from './pipes/round/round.pipe';
import { SafePipe } from './pipes/safe/safe.pipe';
import { TakePipe } from './pipes/take/take.pipe';
import { TimeAgoPipe } from './pipes/time-ago/time-ago.pipe';
import { TimerPipe } from './pipes/timer/timer.pipe';
// import { COMMON_PROVIDERS } from './services';
import { CoreConfig } from './services/core-config/core-config.service';
import { DomAdapter } from './services/dom-adapter/dom-adapter.service';
import { ExifRestorer } from './services/exif-restorer/exif-restorer.service';
import { GeoLocation } from './services/geo-location/geo-location.service';
import { LocalForageService } from './services/local-forage/local-forage.service';
import { LocalStorage } from './services/local-storage/local-storage.service';
import { Log } from './services/log/log.service';
import { Network } from './services/network/network.service';
import { PromiseService } from './services/promise/promise.service';
import { Resize } from './services/resize/resize.service';
import { Ruler } from './services/ruler/ruler.service';
import { Utils } from './services/utils/utils.service';

//import { COMMON_DIRECTIVES } from './directives';
import { LongPressDirective } from './directives/long-press/long-press.directive';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Network as NetworkNative } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [
        ArrayFromNumberPipe,
        CloudinaryPipe,
        DateFormatPipe,
        FileSizePipe,
        HighlightPipe,
        HttpsPipe,
        KeysPipe,
        LimitToPipe,
        MapValuesPipe,
        NewlinePipe,
        NohtmlPipe,
        OrderByPipe,
        RoundPipe,
        SafePipe,
        TakePipe,
        TimeAgoPipe,
        TimerPipe,
        LongPressDirective],
    imports: [
        AngularCommonModule,
        HttpClientModule
    ],
    exports: [
        AngularCommonModule,
        ArrayFromNumberPipe,
        CloudinaryPipe,
        DateFormatPipe,
        FileSizePipe,
        HighlightPipe,
        HttpsPipe,
        KeysPipe,
        LimitToPipe,
        MapValuesPipe,
        NewlinePipe,
        NohtmlPipe,
        OrderByPipe,
        RoundPipe,
        SafePipe,
        TakePipe,
        TimeAgoPipe,
        TimerPipe,
        LongPressDirective
    ]
})
export class CommonModule {
    static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
        return {
            ngModule: CommonModule,
            providers: [
                ...configuredProviders,
                CoreConfig,
                DomAdapter,
                ExifRestorer,
                GeoLocation,
                LocalForageService,
                LocalStorage,
                Log,
                Network,
                PromiseService,
                Resize,
                Ruler,
                Utils,
                Geolocation,
                NetworkNative
            ]
        };
    }
}