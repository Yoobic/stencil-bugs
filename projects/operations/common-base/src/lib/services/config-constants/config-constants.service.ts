import { Injectable } from '@angular/core';
import { ConfigConstants } from '@shared/common';

@Injectable()
export class ConfigConstantsBase extends ConfigConstants {
    public appName: string = 'yoobic';
    public appleStoreUrl: string = 'https://itunes.apple.com/app/yoobic-team/id1184286350?mt=8';
    public playStoreUrl: string = 'https://play.google.com/store/apps/details?id=com.ipelia.yoobicv3';
    public appId: string = 'com.ipelia.yoobicv3';
    public intercomIdProd: string = 'i2cu3kvh';
    public intercomIdDev: string = 'l1btwa0r';

}