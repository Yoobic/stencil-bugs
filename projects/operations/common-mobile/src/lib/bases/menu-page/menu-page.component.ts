import { Injectable } from '@angular/core';
import { AppMenuBasePageComponent } from '@app/common-base';

@Injectable()
export class MenuBasePageComponent extends AppMenuBasePageComponent {

    onShowTestForm() {
        this.utils.showFormDynamic(
            {
                tenant: 'Test',
                number: 100
            }, {
                formDefinition: [
                    { type: 'text', name: 'tenant', required: true, description: 'this is my long field description' },
                    { type: 'number', name: 'number', required: true },
                    { type: 'tel', name: 'tel', required: true }
                ]
            }).then(ret => {
                window['console'].log(ret.data);
            });
    }

}
