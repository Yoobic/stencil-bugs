import { Injectable, OnInit } from '@angular/core';
import { INavBarTab, moment } from '@shared/interfaces';
import { FilesBroker } from '@shared/data-core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class DocumentsPageBaseComponent extends BasePageBaseComponent implements OnInit {
    public tabs: Array<INavBarTab>;
    public selectedTab: INavBarTab;

    public sortModelFilesFolders;
    public mapTransformFilesFolders;
    public customFilterFilesFolders;
    public mapTransformFiles;
    public filesHeaderFn;

    protected files: FilesBroker;

    initExtraProviders() {
        super.initExtraProviders();
        this.files = this.injector.get<FilesBroker>(FilesBroker);
        this.filesHeaderFn = (item, index, records) => {
            let fromNow = moment(item._lmt).fromNow();
            if (index === 0) {
                return fromNow;
            }
            let previousFromNow = moment(records[index - 1]._lmt).fromNow();
            if (previousFromNow !== fromNow) {
                return fromNow;
            }
            return null;
        };
    }

    ngOnInit() {
        super.ngOnInit();
        this.tabs = [
            { title: this.translate.get('RECENTS'), value: 'recents' },
            { title: this.translate.get('BROWSE'), value: 'browse' }
        ];
        this.selectedTab = this.tabs[0];
        this.sortModelFilesFolders = [{ colId: 'fftype', sort: 'DESC' }, { colId: 'name', sort: 'ASC' }, { colId: '_filename', sort: 'ASC' }];
        this.mapTransformFilesFolders = this.files.getFilesFoldersTransformAsync();
        this.mapTransformFiles = this.files.getFilesTransform();
        this.customFilterFilesFolders = {
            or: [
                {
                    and: [
                        { or: [{ parent: { exists: false } }, { parent: '' }] },
                        { fftype: 'folder' }
                    ]
                }, {
                    and: [
                        { or: [{ folder: { exists: false } }, { folder: '' }] },
                        { fftype: 'file' },
                        { hideMobile: { neq: true } }
                    ]
                }

            ]
        };
    }

    onTabSelected(ev: { detail: INavBarTab }) {
        this.selectedTab = ev.detail;
    }

    onDocumentSelect(document) {
        if (document) {
            (this.utils as UtilsService).showDocumentViewer(document);
        }
    }

    onFileOrFolderSelect(fileOrFolder) {
        if (fileOrFolder.fftype === 'file') {
            return (this.utils as UtilsService).showDocumentViewer(fileOrFolder);
        } else {
            return (this.utils as UtilsService).showFolderDetail(fileOrFolder);
        }
    }

}
