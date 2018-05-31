import { Injectable, OnInit, Input } from '@angular/core';
import { Filters } from '@shared/interfaces';
import { FilesBroker, Folder, ISort } from '@shared/data-core';
import { BasePageBaseComponent } from '../base-page/base-page.component';
import { UtilsService } from '../../services/utils/utils.service';

@Injectable()
export class DocumentsDetailPageBaseComponent extends BasePageBaseComponent implements OnInit {
    @Input() public folder: Folder;

    public sortModelFilesFolders: Array<ISort>;
    public mapTransformFilesFolders;
    public filtersFilesFolders: Filters;
    public hiddenFields: Array<string>;
    public folderCount: number;
    public fileCount: number;
    //public loading: boolean = false;

    public fileItemButtons: Array<any>;

    protected files: FilesBroker;

    initExtraProviders() {
        super.initExtraProviders();
        this.files = this.injector.get<FilesBroker>(FilesBroker);
        this.mapTransformFilesFolders = this.files.getFilesFoldersTransformAsync();
        this.sortModelFilesFolders = [{ colId: 'fftype', sort: 'desc' }, { colId: 'name', sort: 'asc' }, { colId: '_filename', sort: 'asc' }];

        this.hiddenFields = ['parent', 'folder', 'hideMobile', 'fftype', 'containerRef'];

        this.fileItemButtons = [{
            text: 'EMAIL',
            icon: 'yo-mail',
            color: 'royal',
            isVisible: (item) => item.fftype === 'file',
            handler: (item) => this.onSendEmail(item)
        }];
    }

    ngOnInit() {
        this.filters = [[{ field: 'parent', operator: { _id: 'eq' }, value: this.folder._id }]];
        this.filtersFilesFolders = [
            [{ field: 'containerRef', operator: { _id: 'eq' }, value: this.folder._id }],
            [
                { field: 'containerRef', operator: { _id: 'eq' }, value: this.folder._id },
                { field: 'hideMobile', operator: { _id: 'neq' }, value: true }
            ]
        ];
        if (this.folder && this.folder.stats) {
            this.folderCount = this.folder.stats.find(s => s.title === 'FOLDERS').value;
            this.fileCount = this.folder.stats.find(s => s.title === 'FILES').value;
        }
    }

    onRefresh() {

    }

    onSelectFileFolder(fileOrFolder) {
        if (fileOrFolder.fftype === 'file') {
            return (this.utils as UtilsService).showDocumentViewer(fileOrFolder);
        } else {
            return (this.utils as UtilsService).showFolderDetail(fileOrFolder);
        }
    }

    onSendEmail(file: File) {
        // this.loading = true;
        // this.cd.markForCheck();
        // this.yoobicDialogs.sendFileByEmail(<any>file, this.viewContainerRef).then(() => {
        //     this.loading = false;
        //     this.cd.markForCheck();
        // }, () => {
        //     this.loading = false;
        //     this.cd.markForCheck();
        // });
    }
}
