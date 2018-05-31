import { Injectable } from '@angular/core';
import { ConfigConstants } from '@shared/common';

@Injectable()
export class ConfigConstantsBase extends ConfigConstants {
    public appName: string = 'yoobic';
}