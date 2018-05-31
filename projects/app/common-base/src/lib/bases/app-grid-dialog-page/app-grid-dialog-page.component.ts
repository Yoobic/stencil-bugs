import { Injectable, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { YooModalComponent } from '@shared/design-system/types';
import { ISort } from '@shared/data-core';
import { CardType, Filters } from '@shared/interfaces';

@Injectable()
export class AppGridDialogBasePageComponent extends BasePageBaseComponent implements OnInit {
    @ViewChild('modal') modalEl: ElementRef<YooModalComponent>;

    @Input() title: string;
    @Input() collectionName: string;
    @Input() mode: string;
    @Input() displayType: CardType;
    @Input() entityType: string;
    @Input() sorts: Array<ISort>;
    @Input() filters: Filters;
    @Input() hiddenFields: Array<string>;
    @Input() emptyState: string;
    @Input() items: Array<any>;
    @Input() pageSize: number;
    @Input() multipleSelect: boolean;
    @Input() keepSelection: boolean;

    @Input() initialSelection: any;

    protected selection: any;

    onItemSelect(item) {
        this.selection = item;
    }

    onSave() {
        this.closeModal(this.selection);
    }

    onCancel() {
        this.closeModal(null);
    }

}
