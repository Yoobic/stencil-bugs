import { Injectable } from '@angular/core';
import { ConfigConstants } from '@shared/common';

@Injectable()
export class ConfigConstantsBase extends ConfigConstants {
    public configIsIonic2 = true;
    public configIsWeb = false;
    public configPlatform = 'IONIC';
    public appName: string = 'yoobic';

}