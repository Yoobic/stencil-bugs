import { Injectable } from '@angular/core';

import { Files } from '../files/files.service';
import { Broker, ResponseObject } from '../broker/broker.service';
import { Folder } from '../../interfaces/folder/folder.interface';
import { Dashboard } from '../dashboard/dashboard.service';

import { Observable, Observer } from 'rxjs';

@Injectable()
export class FilesBroker {
    constructor(private dashboard: Dashboard, private broker: Broker, protected files: Files) { }

    getFilesTransform() {
        return (res: ResponseObject) => {
            if (res && res.data && res.data.map) {
                res.data.forEach((f) => this.updateFileIcon(f));
            }
            return res;
        };
    }

    getFilesFoldersTransformAsync() {
        return (res: ResponseObject, search, filters, start, pageSize) => {
            return new Observable<ResponseObject>((observer: Observer<ResponseObject>) => {
                if (res && res.data && res.data.length > 0) {
                    res.data.forEach(f => {
                        delete f.items;
                        if (f.fftype === 'file') {
                            this.updateFileIcon(f);
                        }
                    });
                    let ids = res.data.filter(f => f.fftype === 'folder').map((folder: Folder) => folder._id);
                    this.dashboard.getFolderFolderStat(ids).subscribe((stats) => {
                        res.data.forEach((folder: Folder) => {
                            let stat = stats.find(s => s._id === folder._id);
                            let value = stat ? stat.folders || 0 : 0;
                            folder.stats = [{ title: 'FOLDERS', color: 'dark', value }];
                            (<any>folder).hasChildren = value > 0;
                        });
                        this.dashboard.getFolderFileStat(ids, false).subscribe((fileStats) => {
                            res.data.forEach((folder: Folder) => {
                                let stat = fileStats.find(s => s._id === folder._id);
                                folder.stats.push({ title: 'FILES', color: 'dark', value: stat ? stat.files || 0 : 0 });
                            });
                            observer.next({ count: res.count, data: <any>res.data });
                            observer.complete();
                        });
                    });
                } else {
                    observer.next({ count: 0, data: [] });
                    observer.complete();
                }
            });
        };
    }

    cleanupFolder(folderId) {
        return this.broker.deleteAll('files', { where: { 'folder': { 'eq': folderId } } });
    }

    updateFileIcon(f) {
        if (this.files.isImage(f)) {
            f.imgSrc = f._downloadURL;
        } else if (this.files.isVideo(f)) {
            f.imgSrc = this.files.getVideoPoster(f._downloadURL);
        } else {
            f.icon = this.files.getIcon(f);
        }
    }

}
