import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataCoreModule } from '@shared/data-core';
import { CommonModule } from '@shared/common';
import { TranslateModule } from '@shared/translate';

//import { DATA_FORM_PROVIDERS } from './services';
import { CellRenderer } from './services/cell-renderer/cell-renderer.service';
import { Conditions } from './services/conditions/conditions.service';
import { FormDynamicBuilder } from './services/form-dynamic-builder/form-dynamic-builder.service';
import { Mapping } from './services/mapping/mapping.service';
import { Chart } from './services/chart/chart.service';
import { CustomModels } from './services/custom-models/custom-models.service';
const PROVIDERS = [CellRenderer,
    Conditions,
    FormDynamicBuilder,
    Mapping,
    Chart,
    CustomModels];
//import { DATA_FORM_RENDERERS } from './renderers';
import { AddressRendererComponent } from './renderers/address/address-renderer.component';
import { BooleanRendererComponent } from './renderers/boolean/boolean-renderer.component';
import { ButtonRendererComponent } from './renderers/button/button-renderer.component';
import { ChecklistRendererComponent } from './renderers/checklist/checklist-renderer.component';
import { ConformityProgressRendererComponent } from './renderers/conformity-progress/conformity-progress-renderer.component';
import { ConformityRelativeProgressRendererComponent } from './renderers/conformity-relative-progress/conformity-relative-progress-renderer.component';
import { CustomModelRendererComponent } from './renderers/custom-model/custom-model-renderer.component';
import { DatetimeRendererComponent, DateRendererComponent } from './renderers/datetime/datetime-renderer.component';
import { DefaultRendererComponent } from './renderers/default/default-renderer.component';
import { DeltaRendererComponent } from './renderers/delta/delta-renderer.component';
import { DistanceRendererComponent } from './renderers/distance/distance-renderer.component';
import { DurationRendererComponent } from './renderers/duration/duration-renderer.component';
import { LocationRendererComponent } from './renderers/location/location-renderer.component';
import { MissionStatusRendererComponent } from './renderers/mission-status/mission-status-renderer.component';
import { MissionValidationRendererComponent } from './renderers/mission-validation/mission-validation-renderer.component';
import { NumberRendererComponent } from './renderers/number/number-renderer.component';
import { MultiPhotosRendererComponent } from './renderers/multiphotos/multiphotos-renderer.component';
import { PercentageRendererComponent } from './renderers/percentage/percentage-renderer.component';
import { PhotoRendererComponent } from './renderers/photo/photo-renderer.component';
import { ProgressRendererComponent } from './renderers/progress/progress-renderer.component';
import { TimeRendererComponent } from './renderers/time/time-renderer.component';
import { TimerRendererComponent } from './renderers/timer/timer-renderer.component';
import { TodoRendererComponent } from './renderers/todo/todo-renderer.component';
import { UserFullNameRendererComponent } from './renderers/user-full-name/user-full-name-renderer.component';
import { ValidationProgressRendererComponent } from './renderers/validation-progress/validation-progress-renderer.component';
import { VideoRendererComponent } from './renderers/video/video-renderer.component';

const RENDERERS = [AddressRendererComponent,
    BooleanRendererComponent,
    ButtonRendererComponent,
    ChecklistRendererComponent,
    ConformityProgressRendererComponent,
    ConformityRelativeProgressRendererComponent,
    CustomModelRendererComponent,
    DatetimeRendererComponent,
    DateRendererComponent,
    DefaultRendererComponent,
    DeltaRendererComponent,
    DistanceRendererComponent,
    DurationRendererComponent,
    LocationRendererComponent,
    MissionStatusRendererComponent,
    MissionValidationRendererComponent,
    NumberRendererComponent,
    MultiPhotosRendererComponent,
    PercentageRendererComponent,
    PhotoRendererComponent,
    ProgressRendererComponent,
    TimeRendererComponent,
    TimerRendererComponent,
    TodoRendererComponent,
    UserFullNameRendererComponent,
    ValidationProgressRendererComponent,
    VideoRendererComponent];
@NgModule({
    declarations: [...RENDERERS],
    entryComponents: [...RENDERERS],
    imports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule],
    exports: [FormsModule, ReactiveFormsModule, DataCoreModule, TranslateModule, CommonModule]
})
export class DataFormModule {
    static forRoot(configuredProviders: Array<Provider> = []): ModuleWithProviders {
        return {
            ngModule: DataFormModule,
            providers: [
                ...PROVIDERS,
                ...configuredProviders
            ]
        };
    }

}
