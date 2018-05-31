import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CellRenderer } from '@shared/data-form';
import { Broker, DataLoader, ISort } from '@shared/data-core';
import { Translate } from '@shared/translate';
import { IGridSearch, Filters, CardType, IEntityAction, IEntity } from '@shared/interfaces';
import { UtilsService } from '../../services/utils/utils.service';

import { YooGridComponent } from '@shared/design-system/types';
import { Refresher } from '@ionic/angular';
import { union } from 'lodash-es';

@Component({
  selector: 'app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppGridComponent implements OnInit, OnChanges {

  //visual inputs passed to stencil
  @Input() direction: string;
  @Input() mode: string;
  @Input() displayType: CardType;
  @Input() entityType: string;
  @Input() emptyState: string;
  @Input() items: Array<IEntity>;
  @Input() pageSize: number;
  @Input() initialSelection: any;
  @Input() headerFn?: (item, index, records) => string;
  @Input() multipleSelect: boolean;
  @Input() displayModes: Array<CardType>;
  //data inputs used in the dataloader service
  @Input() collectionName: string;
  @Input() sorts: Array<ISort>;
  @Input() filters: Filters;
  @Input() hiddenFilters: Filters;
  @Input() hiddenFields: Array<string>;
  @Input() looseCount: boolean;
  @Input() mapTransform: (x) => any;
  @Input() mapTransformAsync: boolean = false;
  @Input() aggregateOptions: (skip, limit) => Array<any>;
  @Input() tag: boolean = false;
  @Input() subQuery: any;
  @Input() fields: Array<any>;
  @Input() customFilter: any;
  @Input() cacheId: string;
  @Input() keepSelection: boolean;

  @Input() icons: Array<IEntityAction>;
  @Input() topActions: Array<IEntityAction>;
  @Input() bottomActions: Array<IEntityAction>;
  @Input() secondaryActions: Array<IEntityAction>;

  @Output() select = new EventEmitter<any>();

  @ViewChild('grid') gridEl: ElementRef<YooGridComponent>;

  public data: Array<any>;
  public total: number;
  public columnDefs: any[];
  public isLoading: boolean;
  public isLocal: boolean;

  protected dataLoader: DataLoader;
  protected includeCount: boolean = true;

  constructor(protected cd: ChangeDetectorRef, protected broker: Broker, protected translate: Translate, protected utils: UtilsService) {
  }

  ngOnInit() {
    this.pageSize = this.pageSize || 20;
    this.isLoading = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataLoader = new DataLoader(this.broker, this.collectionName, this.items, this.pageSize, null, null, this.looseCount);
    this.includeCount = false;
    if (this.aggregateOptions || this.isLocal || !this.collectionName || this.tag) {
      this.includeCount = true;
    }
    // if (this.collectionName && Models.getModelByCollectionName(this.collectionName) && Models.getModelByCollectionName(this.collectionName).feathersService) {
    //   this.includeCount = true;
    // }
    if (changes['collectionName'] && this.collectionName) {
      this.columnDefs = CellRenderer.createColumnDefs(this.collectionName, this.translate);
    }
    if (changes['items']) {
      this.onFetchData(<any>{});
    }
  }

  onFetchData(ev: { detail: IGridSearch }) {
    if (!this.collectionName) {
      this.onFetchDataLocal(ev);
    } else if (this.collectionName) {
      this.onFetchDataRemote(ev);
    }
  }

  onFetchDataLocal(ev: { detail: IGridSearch }) {
    this.isLocal = true;
    this.isLoading = true;
    if (this.items) {
      this.data = [...this.items];
      if (ev && ev.detail && ev.detail.infiniteScroll) {
        ev.detail.infiniteScroll.complete();
      }
      this.isLoading = false;
    }
    this.cd.markForCheck();
  }

  onFetchDataRemote(ev: { detail: IGridSearch }) {
    this.isLocal = false;
    this.isLoading = true;
    this.cd.markForCheck();
    let filters = this.filters || [[]];
    if (this.hiddenFilters && this.hiddenFilters.length > 0) {
      filters = filters.map(filter => {
        return union(filter, <any>this.hiddenFilters);
      });
    }
    this.dataLoader.loadWithSearch(ev.detail.currentPage, ev.detail.search, filters, this.sorts, this.mapTransform, this.mapTransformAsync,
      this.tag, this.subQuery, this.fields, null, this.aggregateOptions, this.cacheId, this.customFilter, this.includeCount).subscribe(ret => {
        if (ev && ev.detail && ev.detail.appendData) {
          this.data = [...this.data, ...ret.data];
        } else {
          this.data = ret.data;
        }
        if (ev && ev.detail && ev.detail.infiniteScroll) {
          ev.detail.infiniteScroll.complete();
          if (!ret.data || ret.data.length === 0) {
            ev.detail.infiniteScroll.disabled = true;
          }
        }
        if (!this.includeCount) {
          if (ev.detail.currentPage === 0) {
            this.dataLoader.loadingPageCount = true;
            this.dataLoader.getCount(null, filters, this.subQuery, this.customFilter).subscribe(() => {
              this.total = this.dataLoader.total;
              this.isLoading = false;
              this.cd.markForCheck();
            });
          } else {
            this.total = ret.count;
            this.isLoading = false;
            this.cd.markForCheck();
          }
        } else {
          this.total = ret.count;
          this.isLoading = false;
          this.cd.markForCheck();
        }
      });
  }

  onPullToRefresh(refresher: Refresher) {
    this.gridEl.nativeElement.pullToRefresh(refresher);
  }

  onSelect(ev: Event) {
    ev.stopPropagation();
    this.select.emit((<any>ev).detail);
  }

  closeItemsSliding() {
    if (this.gridEl) {
      this.gridEl.nativeElement.closeItemsSliding();
    }
  }

  remove(item: IEntity, removeChildren: boolean = false) {
    if (item && this.data && item._id) {
      this.data = [...this.data.filter(i => {
        if (removeChildren && i.isChild) {
          return (i._id !== item._id) && (i.parentRef !== item._id);
        }
        return i._id !== item._id;
      })];
      this.cd.markForCheck();
    }
  }

  insert(item, emitSelect: boolean = false) {
    if (item && item._id && this.data) {
      let index = this.data.findIndex(i => i._id === item._id);
      if (index >= 0) {
        this.data[index] = { ...item };
      } else {
        this.data.unshift(item);
      }
      this.data = this.data.slice();
      this.cd.markForCheck();
    }
  }

  insertAfter(itemToInsert, item) {
    if (item && item._id && this.data) {
      let index = this.data.findIndex(i => i._id === item._id);
      if (index >= 0) {
        this.data = this.data.slice(0, index + 1).concat({ ...itemToInsert }).concat(this.data.slice(index + 1, this.data.length));
      } else {
        this.data.push(item);
      }
      this.data = [...this.data];
      this.cd.markForCheck();
    }
  }
}
