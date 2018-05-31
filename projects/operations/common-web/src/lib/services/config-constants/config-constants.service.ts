import { Injectable } from '@angular/core';
import { ConfigConstantsBase } from '@operations/common-base';


@Injectable()
export class ConfigConstants extends ConfigConstantsBase {
    public configIsIonic2 = false;
    public configIsWeb = true;
    public configPlatform = 'WEB';
}