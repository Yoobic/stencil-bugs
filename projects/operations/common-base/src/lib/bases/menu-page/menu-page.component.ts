import { Injectable } from '@angular/core';
import { AppMenuBasePageComponent } from '@app/common-base';
import { FormFieldType } from '@shared/interfaces';

@Injectable()
export class MenuBasePageComponent extends AppMenuBasePageComponent {

    onShowTestForm() {
        this.utils.showFormDynamic(
            {
                tenant: 'Test',
                number: 100
            }, {
                formDefinition: [
                    { type: FormFieldType.text, name: 'tenant', required: true, description: 'this is my long field description' },
                    { type: FormFieldType.number, name: 'number', required: true },
                    { type: FormFieldType.tel, name: 'tel', required: true }
                ]
            }).then(ret => {
                window['console'].log(ret.data);
            });
    }

}
