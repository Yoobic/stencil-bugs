import { Injectable } from '@angular/core';
import { UtilsService as BaseUtilsService } from '@operations/common-base';
import { AppFormDynamicPageComponent } from '@app/common-mobile';

@Injectable()
export class UtilsService extends BaseUtilsService {

    protected getFormDynamicPageComponent() {
        return AppFormDynamicPageComponent;
    }
}