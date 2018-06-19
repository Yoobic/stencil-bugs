import { Component, ChangeDetectionStrategy, OnInit, Input, OnChanges, SimpleChange, ViewChild, ElementRef, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';

import { IFormField, ISlide, IFormSearch, IGridSearch, FormFieldType } from '@shared/interfaces';
import { Log } from '@shared/common';
import { Models, DataLoader, Broker, FilesBroker, Algorithms } from '@shared/data-core';
import { FormDynamicBuilder } from '@shared/data-form';
import { Translate } from '@shared/translate';
import { YooFormDynamicComponent } from '@shared/design-system/types/components/form/form-dynamic/form-dynamic';

import { isString, clone } from 'lodash-es';

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
  @Input() history: Array<any>;
  @Input() readonly: boolean;
  @Input() suffix: string;
  @Input() showSave: boolean;
  @Input() showTabs: boolean = true;
  @Input() showRecap: boolean = true;
  @Input() oneFieldPerPage: boolean;
  @Input() detailComponent: string;

  @Output() dataChanged = new EventEmitter<any>();
  @Output() save = new EventEmitter<any>();

  @ViewChild('form') form: ElementRef<YooFormDynamicComponent>;

  public finalShowTabs: boolean;
  public finalshowRecap: boolean;
  public hasAdvanced: boolean;

  protected slidesState: Array<{ visible: boolean }>;

  constructor(protected formDynamicBuilder: FormDynamicBuilder, protected cd: ChangeDetectorRef, protected log: Log, protected broker: Broker, protected translate: Translate, protected files: FilesBroker, protected algorithms: Algorithms) {

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

      let collectionName = field.collectionName;
      if (field.type === FormFieldType.location) {
        collectionName = 'locations';
      }

      if (collectionName === 'files' && !field.mapTransform) {
        field.mapTransform = this.files.getFilesTransform();
      }
      let includeCount = false;
      // if (!collectionName || field.tag) {
      //   includeCount = true;
      // }
      let dataLoader = new DataLoader(this.broker, collectionName, null, search.pageSize, field.translate, this.translate);
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

  createPromiseFromValue(value, index?) {
    let promise: Promise<any>;
    if (isString(value) && value.startsWith('http')) {
      promise = Promise.resolve(value);
    } else if (value === null) {
      return Promise.resolve(null);
    } else {
      promise = this.broker.prepareUpload(value).then(file => {
        return this.broker.upload(file);
      }).then(url => {
        return url;
      });
    }
    return promise;
  }

  onImageRecognition(ev: CustomEvent) {
    let fieldData = ev.detail;
    if (fieldData) {
      let { field, fieldValue } = fieldData;
      if (field.multiple) {
        let clonedValue = clone(fieldValue);
        let promises = (clonedValue as any).map((v, index) => {
          return this.createPromiseFromValue(v, index);
        });
        return Promise.all(promises).then((urls: any) => {
          field.value = field.value || [];
          field.value = [...urls];

          this.algorithms.processMultiple(urls, field.imageRecognitionAlgorithm._id).subscribe(retVal => {
            let markupImages = [].concat(retVal.markup_image);
            let extraData: any = {};
            if (retVal.stitch_relations) {
              retVal.stitch_relations.forEach((imageIndexes, index) => {
                let markUpImage = markupImages[index];
                imageIndexes.forEach(imageIndex => {
                  extraData[imageIndex] = extraData[imageIndex] ? extraData[imageIndex] : {};
                  extraData[imageIndex].edit = markUpImage;
                });
              });
              extraData.stitchMode = true;
            } else {
              markupImages.forEach((image, index) => {
                extraData[index] = extraData[index] ? extraData[index] : {};
                extraData[index].edit = image;
              });
            }
            field.extraData = extraData;
            this.form.nativeElement.forceFieldUpdate(field);
          });
        });
      } else {
        let value = fieldValue;
        let promise: Promise<any>;
        promise = this.createPromiseFromValue(value);
        return promise.then(url => {
          field.value = url;
          this.algorithms.process(url, field.imageRecognitionAlgorithm._id).subscribe(retVal => {
            field.edit = retVal.markup_image;
            this.form.nativeElement.forceFieldUpdate(field);
            // this.processImageRecognitionResults(retVal);
            // this.openPreview();
          });
        });
      }
    }
  }

   onImageSaved(event: CustomEvent) {
    //  console.log('On Angular Side image Saved', event.detail);
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