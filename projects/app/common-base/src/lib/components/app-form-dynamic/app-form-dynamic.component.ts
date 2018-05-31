import { Component, ChangeDetectionStrategy, OnInit, Input, OnChanges, SimpleChange, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { IFormField, ISlide, IFormSearch, IGridSearch } from '@shared/interfaces';
import { Log } from '@shared/common';
import { Models, DataLoader, Broker, FilesBroker } from '@shared/data-core';
import { FormDynamicBuilder } from '@shared/data-form';
import { Translate } from '@shared/translate';
import { YooFormDynamicComponent } from '@shared/design-system/types';

import { isString } from 'lodash-es';

@Component({
  selector: 'app-form-dynamic',
  templateUrl: './app-form-dynamic.component.html',
  styleUrls: ['./app-form-dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFormDynamicComponent implements OnInit, OnChanges {
  @Input() formDefinition: Array<IFormField>;
  @Input() slides: Array<ISlide>;
  @Input() collectionName: string;
  @Input() data: Object;
  @Input() readonly: boolean;
  @Input() suffix: string;
  @Input() showSave: boolean;

  @Input() showTabs: boolean = true;
  @Input() showRecap: boolean = true;

  @Input() oneFieldPerPage: boolean;

  @Output() dataChanged = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  @ViewChild('form') form: ElementRef<YooFormDynamicComponent>;

  public finalShowTabs: boolean;
  public finalshowRecap: boolean;
  public hasAdvanced: boolean;

  protected slidesState: Array<{ visible: boolean }>;

  constructor(protected formDynamicBuilder: FormDynamicBuilder, protected cd: ChangeDetectorRef, protected log: Log, protected broker: Broker, protected translate: Translate, protected files: FilesBroker) {

  }

  ngOnInit() { }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['formDefinition'] || changes['slides'] || changes['showTabs'] || changes['readonly']) {
      this.buildForm(false);
    }
  }

  buildForm(markForCheck = true) {
    this.buildFormDefinition();
    this.finalshowRecap = this.showRecap && this.slides.length > 1;
    this.cd.markForCheck();
  }

  onDataChanged(ev: CustomEvent) {
    ev.stopPropagation();
    this.log.log(ev.detail);
    this.dataChanged.emit((<any>ev).detail);
  }

  onSave(ev: CustomEvent) {
    ev.stopPropagation();
    this.save.emit(ev.detail);
  }

  onFieldFetchData(ev: CustomEvent) {
    let formSearch: IFormSearch = ev.detail;
    if (formSearch) {
      let field: IFormField = formSearch.field;
      let search: IGridSearch = formSearch.search;

      if (field.collectionName === 'files' && !field.mapTransform) {
        field.mapTransform = this.files.getFilesTransform();
      }
      let includeCount = true;
      if (!field.collectionName || field.tag) {
        includeCount = true;
      }
      let dataLoader = new DataLoader(this.broker, field.collectionName, null, search.pageSize, field.translate, this.translate);
      dataLoader.loadWithSearch(search.currentPage, search.search, field.filters, null, field.mapTransform, null, field.tag, field.subQuery, null, null, null, null, null, includeCount).subscribe(ret => {
        field.values = field.values || [];
        if (search.appendData) {
          field.values = [...field.values, ...ret.data];
        } else {
          field.values = ret.data;
        }
        if (search.infiniteScroll) {
          search.infiniteScroll.complete();
          if (!ret.data || ret.data.length === 0) {
            search.infiniteScroll.disabled = true;
          }
        }
        this.form.nativeElement.forceFieldUpdate(field);
      });
    }
  }

  goToRecap() {
    this.form.nativeElement.goToRecap();
  }

  isValid() {
    if (this.form && this.form.nativeElement) {
      return this.form.nativeElement.isValid();
    }
    return false;
  }

  protected buildFormDefinition() {
    if (this.collectionName) {
      this.formDefinition = isString(this.collectionName) ? Models.getModelByCollectionName(this.collectionName).formFields : Models.getModel(this.collectionName).formFields;
    }
    if (this.formDefinition) {
      this.finalShowTabs = this.showTabs !== false && this.formDynamicBuilder.hasTabs(this.formDefinition);
      if (this.finalShowTabs) {
        this.slides = this.formDynamicBuilder.getSlides(this.formDefinition);
      } else {
        this.slides = [{ hideheader: true, title: 'GENERAL', items: this.formDefinition }];
      }
    } else {
      this.finalShowTabs = this.slides.length > 1;
    }
    this.finalShowTabs = this.finalShowTabs && this.showTabs;

    let fields = Models.getFieldsFromSlides(this.slides);
    this.hasAdvanced = fields.filter(f => f.advanced).length > 0;

    if (this.oneFieldPerPage) {
      this.slides = fields.map(field => {
        return <ISlide>{
          hideheader: true,
          title: field.title,
          items: [field]
        };
      });
    }
  }

}