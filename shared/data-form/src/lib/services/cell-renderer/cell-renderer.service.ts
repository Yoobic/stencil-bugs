import { Injectable } from '@angular/core';
import { Translate } from '@shared/translate';

import { Models} from '@shared/data-core';
import { IFormField, FormFieldType, moment } from '@shared/interfaces';
import { AddressRendererComponent } from '../../renderers/address/address-renderer.component';
import { BooleanRendererComponent } from '../../renderers/boolean/boolean-renderer.component';
import { ButtonRendererComponent } from '../../renderers/button/button-renderer.component';
import { ChecklistRendererComponent } from '../../renderers/checklist/checklist-renderer.component';
import { CustomModelRendererComponent } from '../../renderers/custom-model/custom-model-renderer.component';
import { DatetimeRendererComponent, DateRendererComponent } from '../../renderers/datetime/datetime-renderer.component';
import { DefaultRendererComponent } from '../../renderers/default/default-renderer.component';
import { DistanceRendererComponent } from '../../renderers/distance/distance-renderer.component';
import { DurationRendererComponent } from '../../renderers/duration/duration-renderer.component';
import { LocationRendererComponent } from '../../renderers/location/location-renderer.component';
import { PhotoRendererComponent } from '../../renderers/photo/photo-renderer.component';
import { NumberRendererComponent } from '../../renderers/number/number-renderer.component';
import { MultiPhotosRendererComponent } from '../../renderers/multiphotos/multiphotos-renderer.component';
import { PercentageRendererComponent } from '../../renderers/percentage/percentage-renderer.component';
import { ProgressRendererComponent } from '../../renderers/progress/progress-renderer.component';
import { TimeRendererComponent } from '../../renderers/time/time-renderer.component';
import { TimerRendererComponent } from '../../renderers/timer/timer-renderer.component';
import { TodoRendererComponent } from '../../renderers/todo/todo-renderer.component';
import { UserFullNameRendererComponent } from '../../renderers/user-full-name/user-full-name-renderer.component';
import { VideoRendererComponent } from '../../renderers/video/video-renderer.component';
import { CellRendererBase, exists } from './cell-renderer.base';

import { isNumber, isObject, compact, sum as _sum, min as _min, max as _max, sortBy, keys as _keys, cloneDeep, concat } from 'lodash-es';

@Injectable()
export class CellRenderer extends CellRendererBase {

    public static defaultGroupComparator(valueA: any, valueB: any, nodeA: any, nodeB: any) {
        if (nodeA.group === true && nodeB.group === true) {
            return defaultComparator(nodeA.allChildrenCount, nodeB.allChildrenCount);
        } else {
            return coreGroupComparator(valueA, valueB, nodeA, nodeB);
        }
    }

    public static dateComparator(valueA: any, valueB: any, nodeA: any, nodeB: any, isInverted: boolean) {
        if (valueA && valueB) {
            let dateA = moment(valueA, 'L').toDate();
            let dateB = moment(valueB, 'L').toDate();
            return defaultComparator(dateA, dateB);
        } else {
            return coreGroupComparator(valueA, valueB, nodeA, nodeB);
        }
    }

    public static maxAggFunc(values) {
        let array = compact(values.map(v => isObject(v) ? v.value : v));
        let max = _max(array);
        let result = {
            value: max,
            toString: function () {
                if (this.value) {
                    return this.value;
                }
                return '';
            }
        };
        return result;
    }

    public static minAggFunc(values) {
        let array = compact(values.map(v => isObject(v) ? v.value : v));
        let min = _min(array);
        let result = {
            value: min,
            toString: function () {
                if (this.value) {
                    return this.value;
                }
                return '';
            }
        };
        return result;
    }

    public static avgAggFunc(values) {
        let array = compact(values.map(v => isObject(v) ? v.value : v));
        let avg = 0;
        if (array.length > 0) {
            avg = _sum(array) / array.length;
        }
        let result = {
            value: avg,
            toString: function (): any {
                if (isNumber(this.value)) {
                    return Math.round(this.value * 100) / 100;
                }
                return '';
            }
        };
        return result;
    }

    public static sumAggFunc(values) {
        let array = compact(values.map(v => isObject(v) ? v.value : v));
        let sum = 0;
        if (array.length > 0) {
            sum = _sum(array);
        }
        let result = {
            value: sum,
            toString: function (): any {
                if (isNumber(this.value)) {
                    return Math.round(this.value * 100) / 100;
                }
                return '';
            }
        };
        return result;
    }

    public static countValuesAggFunc(values, translate: Translate) {
        let counts = {};
        values.forEach(function (value) {
            if (value && isObject(value) && value.counts) {
                //we are on a grouped row here
                let keys = _keys(value.counts);
                keys.forEach(key => {
                    counts[key] = (counts[key] || 0) + value.counts[key];
                });
            } else if (value) {
                counts[value] = (counts[value] || 0) + 1;
            }
        });
        let result = {
            counts: counts,
            toString: function () {
                let retVal = '';
                if (this.counts) {
                    let keys = sortBy(_keys(this.counts), k => k);
                    keys.forEach(key => {
                        retVal += CellRenderer.getKeyTemplate(key, counts[key], translate);
                    });
                }
                return retVal;
            }
        };
        return result;
    }

    public static getColumnDefinition(field: IFormField, translate: any, visibleFields?: Array<string>, sortModel?: Array<any>, component?: { photos?: Array<any>; onPhotoSelect?: Function; onVideoSelect?: Function; }): any {
        let fieldName = Models.getFieldName(field);
        let col: any = <any>{
            headerName: Models.getFieldTitle(field, translate),
            headerTooltip: Models.getFieldTitle(field, translate),
            field: fieldName,
            cellRendererType: field.type,
            minWidth: field.columnDefinition && field.columnDefinition.width ? field.columnDefinition.width : 40,
            width: field.columnDefinition && field.columnDefinition.width ? field.columnDefinition.width : 100,
            hide: field.visible === false || (field.columnDefinition ? field.columnDefinition.hidden : false),
            suppressSorting: field.columnDefinition && field.columnDefinition.name && field.columnDefinition && field.columnDefinition.name.length > 0,
            forceExport: field.forceExport,
            exportOrder: field.exportOrder,
            suppressExport: field.suppressExport,
            menuTabs: ['filterMenuTab']
        };

        if (field.type) {
            (<any>col).type = field.type;
        }

        if (visibleFields && visibleFields.length > 0) {
            col.hide = visibleFields.indexOf(fieldName) < 0;
        }
        if (sortModel && sortModel.indexOf({ colId: col.field, sort: 'asc' }) >= 0) {
            col.sort = 'asc';
        }
        if (sortModel && sortModel.indexOf({ colId: col.field, sort: 'desc' }) >= 0) {
            col.sort = 'desc';
        }
        if (col.headerName && col.headerName.toUpperCase() === col.headerName) {
            col.headerName = translate.get(col.headerName);
        }

        if (field.cellRenderer) {
            col.cellRenderer = (params) => {
                let value = DefaultRendererComponent.renderer(params);
                return field.cellRenderer(value, field, params, translate);
            };
        } else if (Models.isBooleanField(field)) {
            col.cellRendererType = 'boolean';
            col.cellRendererFramework = BooleanRendererComponent;
        } else if (Models.isVideoField(field)) {
            col.cellRendererType = 'video';
            col.cellRendererFramework = VideoRendererComponent;
            col.onCellClicked = (params) => {
                let url = DefaultRendererComponent.renderer(params);
                if (url && component && component.onVideoSelect) {
                    component.onVideoSelect(url);
                }
            };
        } else if (Models.isPhotoField(field)) {
            col.cellRendererType = 'photo';
            PhotoRendererComponent.cmp = component; // safe ?
            col.cellRendererFramework = PhotoRendererComponent;
            col.onCellClicked = (params) => {
                let photo = Models.getPhotoFromParams(params);
                if (photo && component && component.onPhotoSelect) {
                    component.onPhotoSelect(photo);
                }

            };
        } else if (Models.isMultiPhotosField(field)) {
            col.cellRendererType = 'multiphoto';
            MultiPhotosRendererComponent.cmp = component;
            col.cellRendererFramework = MultiPhotosRendererComponent;
            col.onCellClicked = (params) => {
                let photos = Models.getPhotosFromParams(params);
                if (photos && photos.length > 0 && component && component.onPhotoSelect) {
                    component.onPhotoSelect(photos[0]);
                }
            };
        } else if ((<any>field).isDistanceField === true) {
            col.cellRendererType = 'distance';
            col.cellRendererFramework = DistanceRendererComponent;
            col.suppressSorting = true;
            //col.comparator = DistanceRendererComponent.comparator;
        } else if (field.type === FormFieldType.number) {
            col.cellRendererFramework = NumberRendererComponent;
        } else if (field.type === FormFieldType.date) {
            col.cellRendererFramework = DateRendererComponent;
        } else if (Models.isDateTimeField(field)) {
            col.cellRendererFramework = DatetimeRendererComponent;
        } else if (field.type === FormFieldType.time) {
            col.cellRendererFramework = TimeRendererComponent;
        } else if (field.type === FormFieldType.address) {
            col.cellRendererFramework = AddressRendererComponent;
        } else if (field.type === FormFieldType.location) {
            col.cellRendererFramework = LocationRendererComponent;
        } else if (field.type === FormFieldType.todo) {
            col.cellRendererFramework = TodoRendererComponent;
        } else if (field.type === FormFieldType.timer) {
            col.cellRendererFramework = TimerRendererComponent;
        } else if (field.type === FormFieldType.checklist) {
            col.cellRendererFramework = ChecklistRendererComponent;
        } else if (field.type === FormFieldType.autocomplete && field.collectionName && Models.getModelByCollectionName(field.collectionName) && Models.getModelByCollectionName(field.collectionName).isCustom) {
            col.cellRendererFramework = CustomModelRendererComponent;
        } else {
            col.cellRendererFramework = DefaultRendererComponent;
        }

        if (field.columnDefinition && field.columnDefinition.rendererType) {
            switch (field.columnDefinition.rendererType) {
                case 'percentage':
                    col.cellRendererFramework = PercentageRendererComponent;
                    break;

                case 'duration':
                    col.cellRendererFramework = DurationRendererComponent;
                    break;

                case 'userfullname':
                    col.cellRendererFramework = UserFullNameRendererComponent;
                    break;
            }
        }

        return col;
    }

    public static getColumnTypes() {
        return {
            'address': {},
            'audio': {},
            'autocomplete': {},
            'barcode': {},
            'between-date': {},
            'between-number': {},
            'button': {},
            'catalog': {},
            'checkbox': {},
            'color': {},
            'date': {},
            'daterange': {},
            'datetime-local': {},
            'document': {},
            'documentuploader': {},
            'email': {},
            'emailreport': {},
            'filter': {},
            'grid': {},
            'image': {},
            'information': {},
            'inttel': {},
            'invite': {},
            'json': {},
            'location': {},
            'missionfield': {},
            'missionscore': {},
            'number': {},
            'password': {},
            'multiphotos': {},
            'photo': {},
            'productcheck': {},
            'range': {},
            'ranking': {},
            'select': {},
            'selectbuttons': {},
            'selectbuttonsmulti': {},
            'selectimage': {},
            'selectmulti': {},
            'signature': {},
            'starrating': {},
            'string': {},
            'stripecard': {},
            'tel': {},
            'text': {},
            'textarea': {},
            'time': {},
            'timer': {},
            'todo': {},
            'toggle': {},
            'video': {},
            'knob': {},
            'selectchat': {},
            'missingword': {},
            'swipeselect': {},
            'checklist': {},
            'formula': {},
            'videoplayer': {}
        };
    }

    public static getConfig(multipleSelect: boolean, rowModelType: string, infiniteScrolling: boolean, pageSize: number, translate: Translate): any {
        return <any>{
            rowHeight: 52, rowStyle: { 'line-height': '32px' }, headerHeight: 40,
            enableColResize: true,
            enableServerSideSorting: true,
            rowDeselection: true,
            rowSelection: multipleSelect ? 'multiple' : 'single',
            rowModelType: rowModelType || 'infinite',
            maxConcurrentDatasourceRequests: 2,
            cacheOverflowSize: 2,
            maxBlocksInCache: 2,
            infiniteInitialRowCount: 1,
            pagination: !infiniteScrolling,
            paginationPageSize: pageSize,
            cacheBlockSize: pageSize,
            suppressPropertyNamesCheck: true,
            animateRows: true,
            // suppressMenuFilterPanel: true,
            // suppressMenuMainPanel: true,
            // suppressMenuColumnPanel: true,
            showToolPanel: false,
            toolPanelSuppressSideButtons: true,
            localeText: CellRenderer.getTranslation(translate),
            suppressContextMenu: true,
            dateComponent: null,
            columnTypes: CellRenderer.getColumnTypes()
        };
    }

    public static getPivotConfig(translate: Translate): any {
        function getPivotConfigProgressRenderer(params) {
            return ProgressRendererComponent.renderer(params, translate);
        }

        function getPivotConfigComparator(valueA, valueB, nodeA, nodeB) {
            return CellRenderer.defaultGroupComparator(valueA, valueB, nodeA, nodeB);
        }

        return {
            rowHeight: 52,
            enableColResize: true,
            rowStyle: { 'line-height': '32px' },
            headerHeight: 40,
            enableSorting: true,
            enableFilter: true,
            showToolPanel: false,
            toolPanelSuppressSideButtons: true,
            suppressPreventDefaultOnMouseWheel: false,
            suppressPropertyNamesCheck: true,
            //enableStatusBar: true,
            //enableRangeSelection: true,
            rememberGroupStateWhenNewData: true,
            suppressAggFuncInHeader: true,
            groupDefaultExpanded: 0,
            groupSuppressGroupColumn: true,
            suppressRowHoverClass: true,
            autoGroupColumnDef: {
                headerName: translate.get('GROUP'),
                cellRenderer: 'agGroupCellRenderer',
                //cellRendererParams: { padding: 30 },
                comparator: getPivotConfigComparator
            },
            icons: {
                menu: '<i class="yo-menu"/>',
                filter: '<i class="yo-filter"/>',
                groupExpanded: '<i class="yo-check-minus"/>',
                groupContracted: '<i class="yo-check-plus"/>',
                columnGroupOpened: '<i class="yo-circle-minus"/>',
                columnGroupClosed: '<i class="yo-circle-plus"/>',
                columnSelectOpen: '<i class="yo-circle-minus"/>',
                columnSelectClosed: '<i class="yo-circle-plus"/>',
                checkboxChecked: '<i class="yo-check-tick"/>',
                checkboxUnchecked: '<i class="yo-check-empty"/>',
                checkboxIndeterminate: '<i class="yo-circle"/>',
                sortAscending: '<i class="yo-up-arrow"/>',
                sortDescending: '<i class="yo-down-arrow"/>',
                columnMoveGroup: '<i class="yo-move"/>',
                dropNotAllowed: '<i class="yo-notallowed"/>'

            },
            columnTypes: CellRenderer.getColumnTypes(),
            localeText: this.getTranslation(translate),
            aggFuncs: {
                countValues: (values) => CellRenderer.countValuesAggFunc(values, translate),
                max: (values) => CellRenderer.maxAggFunc(values),
                min: (values) => CellRenderer.minAggFunc(values),
                avg: (values) => CellRenderer.avgAggFunc(values),
                sum: (values) => CellRenderer.sumAggFunc(values)
            },
            // groupRowAggNodes: (nodes) => {
            //     return nodes.length.toString();
            // }
            groupUseEntireRow: false,
            groupRowInnerRenderer: getPivotConfigProgressRenderer
        };
    }

    public static getTranslation(translate: Translate) {
        return {
            next: '<i class="yo-right"></i>',
            // last: '<i class="yo-chevron2-right"></i>',
            // first: '<i class="yo-chevron2-left"></i>',
            previous: '<i class="yo-left"></i>',
            page: ' ',
            of: '/',
            //page: translate.get('AGGRIDPAGE'),
            more: translate.get('AGGRIDMORE'),
            to: ' - ',
            //of: translate.get('AGGRIDOF'),
            //next: translate.get('AGGRIDNEXT'),
            //last: translate.get('AGGRIDLAST'),
            //first: translate.get('AGGRIDFIRST'),
            //previous: translate.get('AGGRIDPREVIOUS'),
            loadingOoo: translate.get('AGGRIDLOADINGOOO'),
            selectAll: translate.get('AGGRIDSELECTALL'),
            searchOoo: translate.get('AGGRIDSEARCHOOO'),
            blanks: translate.get('AGGRIDBLANKS'),
            filterOoo: translate.get('AGGRIDFILTEROOO'),
            applyFilter: translate.get('AGGRIDAPPLYFILTER'),
            equals: translate.get('AGGRIDEQUALS'),
            lessThan: translate.get('AGGRIDLESSTHAN'),
            greaterThan: translate.get('AGGRIDGREATERTHAN'),
            contains: translate.get('AGGRIDCONTAINS'),
            startsWith: translate.get('AGGRIDSTARTSWITH'),
            endsWith: translate.get('AGGRIDENDSWITH'),
            group: translate.get('AGGRIDGROUP'),
            columns: translate.get('AGGRIDCOLUMNS'),
            rowGroupColumns: translate.get('AGGRIDROWGROUPCOLUMNS'),
            rowGroupColumnsEmptyMessage: translate.get('AGGRIDROWGROUPCOLUMNSEMPTYMESSAGE'),
            valueColumns: translate.get('AGGRIDVALUECOLUMNS'),
            pivotMode: translate.get('AGGRIDPIVOTMODE'),
            groups: translate.get('AGGRIDGROUPS'),
            values: translate.get('AGGRIDVALUES'),
            pivots: translate.get('AGGRIDPIVOTS'),
            valueColumnsEmptyMessage: translate.get('AGGRIDVALUECOLUMNSEMPTYMESSAGE'),
            pivotColumnsEmptyMessage: translate.get('AGGRIDPIVOTCOLUMNSEMPTYMESSAGE'),
            noRowsToShow: translate.get('AGGRIDNOROWSTOSHOW'),
            pinColumn: translate.get('AGGRIDPINCOLUMN'),
            valueAggregation: translate.get('AGGRIDVALUEAGGREGATION'),
            autosizeThiscolumn: translate.get('AGGRIDAUTOSIZETHISCOLUMN'),
            autosizeAllColumns: translate.get('AGGRIDAUTOSIZEALLCOLUMNS'),
            groupBy: translate.get('AGGRIDGROUPBY'),
            ungroupBy: translate.get('AGGRIDUNGROUPBY'),
            resetColumns: translate.get('AGGRIDRESETCOLUMNS'),
            expandAll: translate.get('AGGRIDEXPANDALL'),
            collapseAll: translate.get('AGGRIDCOLLAPSEALL'),
            toolPanel: translate.get('AGGRIDTOOLPANEL'),
            pinLeft: translate.get('AGGRIDPINLEFT'),
            pinRight: translate.get('AGGRIDPINRIGHT'),
            noPin: translate.get('AGGRIDNOPIN'),
            sum: translate.get('AGGRIDSUM'),
            min: translate.get('AGGRIDMIN'),
            max: translate.get('AGGRIDMAX'),
            none: translate.get('AGGRIDNONE'),
            count: translate.get('AGGRIDCOUNT'),
            average: translate.get('AGGRIDAVERAGE'),
            avg: translate.get('AGGRIDAVERAGE'),
            copy: translate.get('AGGRIDCOPY'),
            ctrlC: translate.get('AGGRIDCTRLC'),
            paste: translate.get('AGGRIDPASTE'),
            ctrlV: translate.get('AGGRIDCTRLV')
        };
    }

    public static createColumnDefs(collectionName?: string, translate?: Translate, collectionFields?: Array<any>, customColumnDefs?: Array<any>, includeDistance?: boolean, infiniteScrolling?: boolean, itemButtons?: Array<any>, colMinWidth?: number, visibleFields?, sortModel?, grid?, hiddenColumns?, gridCellCatalogComponent?) {
        let columnDefs = [];
        if (customColumnDefs && customColumnDefs.length > 0) {
            columnDefs = cloneDeep(customColumnDefs);
        } else {
            if (!collectionName) { return; } // || (items && items.length > 0)
            let formFields: Array<IFormField> = [];
            let model = Models.getModelByCollectionName(collectionName);
            if (model) {
                formFields = model.formFields;
                if (collectionFields && collectionFields.length > 0) {
                    formFields = concat(formFields, collectionFields);
                }
            }
            columnDefs = [];
            formFields.forEach((field) => {
                let colEdit;
                let col = CellRenderer.getColumnDefinition(field, translate, visibleFields, sortModel, grid);
                if (colMinWidth > 0 && col.minWidth === 40) {
                    col.minWidth = colMinWidth;
                }
                col.menuTabs = [];
                if (field.type === FormFieldType.catalog) {
                    col.cellRendererFramework = gridCellCatalogComponent;
                    col.isPresence = field.presence;
                    col.isInventory = field.inventory;
                }
                if (field.type === FormFieldType.multiphotos) {
                    col.suppressExport = true;
                }
                //if (col.hide !== true) {
                if ((!hiddenColumns || hiddenColumns.indexOf(col.field) < 0)) {
                    columnDefs.push(col);
                }
                if (field.isImageRecognition && field.type === FormFieldType.photo) {
                    colEdit = cloneDeep(col);
                    colEdit.hide = true;
                    colEdit.headerName += ' - Markup';
                    colEdit.forceExport = true;
                    colEdit.field = colEdit.field.replace('.value', '.edit');
                    columnDefs.push(colEdit);
                }
                if (field.type === FormFieldType.multiphotos) {
                    for (let i = 0; i < field.maxPhotos; i++) {
                        let colPhoto = cloneDeep(col);
                        colPhoto.hide = true;
                        colPhoto.suppressExport = false;
                        colPhoto.headerName += ' ' + i;
                        colPhoto.forceExport = true;
                        colPhoto.field = colPhoto.field.replace('.value', '.value[' + i + ']');
                        columnDefs.push(colPhoto);

                        if (field.isImageRecognition) {
                            colEdit = cloneDeep(col);
                            colEdit.hide = true;
                            colEdit.suppressExport = false;
                            colEdit.headerName += ' - Markup ' + i;
                            colEdit.forceExport = true;
                            colEdit.field = colEdit.field.replace('.value', '.extraData[' + i + '].edit');
                            columnDefs.push(colEdit);

                        }
                    }
                }
                //}
            });
        }

        if (includeDistance) {
            let distanceField = { name: 'distance', title: 'Distance', type: 'number', columnDefinition: { width: 150 }, isDistanceField: true };
            let distanceCol = CellRenderer.getColumnDefinition(distanceField, translate);
            columnDefs.push(distanceCol);
        }

        if (infiniteScrolling === true) {
            columnDefs.unshift({ headerName: '#', width: 50, cellRenderer: (params) => params.node.id + 1 });
        }

        if (itemButtons && itemButtons.length > 0) {
            itemButtons.forEach(button => {
                columnDefs.push({
                    //headerName: this.translate.get(button.text || button.title),
                    minWidth: 45,
                    width: 45,
                    headerClass: 'centered',
                    cellClass: 'overflow',
                    suppressExport: true,
                    suppressSorting: true,
                    suppressFilter: true,
                    pinned: 'right',
                    menuTabs: ['filterMenuTab'],
                    context: {
                        icon: button.icon,
                        color: button.color,
                        text: button.text
                    },
                    cellRendererFramework: ButtonRendererComponent,
                    //cellRenderer: (params) => '<div class="ag-cell-button" toolip=""><i class="' + button.icon + ' ' + button.color + '"></i></div>',
                    onCellClicked: (params) => {
                        button.handler(params.data && params.data.toJS ? params.data.toJS() : params.data);
                        return false;
                    }
                });
            });
        }
        return columnDefs;
    }
}

export { exists };

export function defaultComparator(valueA: any, valueB: any): number {
    return CellRenderer.defaultComparator(valueA, valueB);
}

export function coreGroupComparator(valueA: any, valueB: any, nodeA: any, nodeB: any): number {
    return CellRenderer.coreGroupComparator(valueA, valueB, nodeA, nodeB);
}
