import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DefaultRendererComponent } from '../default/default-renderer.component';

@Component({
    selector: 'checklist-cell',
    template: `
        <span *ngFor="let t of value?.currentTasks">{{t}};</span>
    `
})
export class ChecklistRendererComponent implements ICellRendererAngularComp {
    public static cmp: any = null;

    public value: any;
    private params: any;
    constructor() { }

    agInit(params: any) {
        this.params = params;
        this.value = DefaultRendererComponent.renderer(this.params);
    }

    refresh(params: any) {
        return false;
    }
}