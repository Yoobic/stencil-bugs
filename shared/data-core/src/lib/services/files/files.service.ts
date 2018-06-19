import { Injectable } from '@angular/core';
import { ExifRestorer, CoreConfig, Log, PromiseService } from '@shared/common';
import { IFilesService } from '@shared/interfaces';

import { File } from '../../interfaces/file/file.interface';
import { Requestor } from '../requestor/requestor.service';
import { Config } from '../config/config.service';

import { Device } from '@ionic-native/device/ngx';
import { File as FileNative } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as uuid from 'uuid';
import { clone } from 'lodash-es';

@Injectable()
export class Files implements IFilesService {

    public static videos = ['mp4', 'avi', 'mov', 'm4v', '3gp'];
    public static audios = ['mp3', 'wav', 'm4a'];
    public static images = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg'];
    public static documents = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'csv', 'txt'];

    constructor(private exifRestorer: ExifRestorer, private rq: Requestor, private coreConfig: CoreConfig, private log: Log, protected config: Config, private device: Device, private fileOpener: FileOpener, private fileNative: FileNative, private transfer: FileTransfer, private promiseService: PromiseService) { }

    isFile(file) {
        let isFile = file && file.constructor && (file.constructor.name === 'File' || file.constructor.name === 'Blob' || file.toString() === '[object File]' || file.toString() === '[object Blob]');
        return isFile;
    }

    isBase64(file) {
        let retVal = file && file.indexOf && file.indexOf('data:') === 0;
        return retVal;
    }

    isFileUri(file) {
        let retVal;
        if (this.coreConfig.isIOS()) {
            retVal = file && file.indexOf && (file.indexOf('file:') === 0 || file.indexOf('/var/mobile') === 0);
        } else {
            retVal = file && file.indexOf && file.indexOf('file:') === 0;
        }
        return retVal;
    }

    isImageFile(file) {
        return this.isFile(file) || this.isBase64(file) || this.isFileUri(file);
    }

    read(nativeFile: File | Blob, type = 'blob', encoding?: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onload = (e: any) => {
                resolve(e.target.result);
            };
            fileReader.onerror = (e) => reject(e);
            if (type === 'blob') {
                fileReader.readAsDataURL(<any>nativeFile);
            } else if (type === 'binary') {
                fileReader.readAsBinaryString(<any>nativeFile);
            } else {
                fileReader.readAsText(<any>nativeFile, encoding);
            }
        });
    }

    getExtension(file: File | any) {
        let url = file._filename || file._downloadURL || file.name || file;
        if (url && url.split) {
            return url.split('.').pop().toLowerCase();
        }
        return '';
    }

    changeExtension(filename: string, extension: string): string {
        let split = filename.split('.');
        split[split.length - 1] = extension;
        return split.reduce((a, b) => a + '.' + b);
    }

    getMaxSize(extension) {
        // if (Files.images.indexOf(extension) >= 0) {
        //     return 10000000;
        // } else if (Files.videos.indexOf(extension) >= 0) {
        //     return 500000000;
        // } else {
        return 100000000;
        //     }
    }

    toPng(value: string) {
        if (value) {
            return value.substr(0, value.lastIndexOf('.')) + '.png';
        }
        return '';
    }

    isValid(file: File) {
        let extension = this.getExtension(file);
        if (file.size < this.getMaxSize(extension)) {
            return true;
        }
        return false;
    }

    isImage(file: File | any) {
        let extension = this.getExtension(file);
        return Files.images.indexOf(extension) >= 0;
    }

    isVideo(file: File | any) {
        let extension = this.getExtension(file);
        return Files.videos.indexOf(extension) >= 0;
    }

    isAudio(file: File | any) {
        let extension = this.getExtension(file);
        return Files.audios.indexOf(extension) >= 0;
    }

    isDocument(file: File | any) {
        let extension = this.getExtension(file);
        return Files.documents.indexOf(extension) >= 0;
    }

    getType(file: File | any) {
        if (this.isImage(file)) {
            return 'image';
        } else if (this.isDocument(file)) {
            return 'document';
        } else if (this.isVideo(file)) {
            return 'video';
        } else if (this.isAudio(file)) {
            return 'audio';
        }
        return 'unknown';
    }

    getMimeType(file: File | any) {
        let extension = this.getExtension(file);
        switch (extension) {
            case 'pdf':
                return 'application/pdf';
            case 'xls':
                return 'application/vnd.ms-excel';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            case 'csv':
                return 'text/csv';
            case 'ppt':
                return 'application/vnd.ms-powerpoint';
            case 'pptx':
                return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
            case 'doc':
                return 'application/msword';
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'png':
                return 'image/png';
            case 'jpeg':
            case 'jpg':
                return 'image/jpeg';
            case 'gif':
                return 'image/gif';
            case 'bmp':
                return 'image/bmp';
            case 'mp4':
            case 'm4v':
                return 'video/mp4';
            case '3gp':
                return 'video/3gpp';
            case 'mov':
                return 'video/mp4';
            case 'mpg':
                return 'video/mpg';
            case 'avi':
                return 'video/avi';
            case 'mp3':
                return 'audio/mpeg';
            case 'wav':
                return 'audio/wav';
            default:
                return 'yo-file';
        }
    }

    getIcon(file: File) {
        let extension = this.getExtension(file);
        switch (extension) {
            case 'pdf':
                return 'yo-file-pdf danger';

            case 'xls':
            case 'xlsx':
            case 'csv':
                return 'yo-file-excel balanced';

            case 'ppt':
            case 'pptx':
                return 'yo-file-powerpoint warning';

            case 'doc':
            case 'docx':
                return 'yo-file-word accent';

            default:
                if (this.isImage(file)) {
                    return 'yo-image royal';
                }
                if (this.isVideo(file)) {
                    return 'yo-svg-play';
                }
                if (this.isAudio(file)) {
                    return 'yo-audio';
                }
                return 'yo-file';
        }
    }

    getVideoPoster(value: string) {
        if (this.isVideo(value)) {
            value = value.substr(0, value.lastIndexOf('.')) + '.png';
        }
        return value;
    }

    b64toBlob(b64Data, contentType = null, sliceSize = 512) {
        if (!contentType) {
            contentType = this.getBase64MimeType(b64Data);
        }
        b64Data = b64Data.replace('data:' + contentType + ';base64,', '').replace(/\s/g, '');
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    blobToFile(blob): File {
        if (blob) {
            blob.lastModifiedDate = new Date();
            blob.name = uuid.v4() + '.jpg';
        }
        return <File>blob;
    }

    b64ToFile(data: string, file: File): File {
        let blob: any = this.b64toBlob(data);
        blob.lastModifiedDate = new Date();
        blob.name = (<any>file).name;
        return <File>blob;
    }

    saveBase64AsImageFile(data: string) {
        let newName = Math.random().toString(36).substr(2) + this.getBase64Extension(data);
        let dataBlob = this.b64toBlob(data);
        return this.getNativeDirectory('images').then((directory: any) => {
            return this.fileNativeWriteFile(directory.nativeURL, newName, dataBlob, { replace: true });
        }, (err) => { });
    }

    resizeBase64Image(base64, maxWidth, maxHeight) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                let ratio = 1;
                if (img.width > maxWidth || img.height > maxHeight) {
                    ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                    img.width *= ratio;
                    img.height *= ratio;
                }

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                let data = canvas.toDataURL('image/jpeg', 0.7);
                data = this.exifRestorer.restore(base64, data);
                canvas = null;
                resolve(data);
            };
            img.src = base64;
        });
    }

    getBase64MimeType(base64: string) {
        return base64.split(';')[0].replace('data:', '');
    }

    getBase64Extension(base64: string) {
        let mimeType = this.getBase64MimeType(base64);
        switch (mimeType) {
            case 'image/png':
                return '.png';
            case 'image/jpeg':
            case 'image/jpg':
                return '.jpg';

            default:
                return '.' + mimeType.split('/')[1];

        }
    }

    resizeImage(file: File, maxWidth: Number, maxHeight: Number): Promise<File> {
        if (!maxWidth || !maxHeight) {
            return Promise.resolve(file);
        }
        return this.read(file).then((base64: string) => {
            return this.resizeBase64Image(base64, maxWidth, maxHeight);
        }).then((data: string) => {
            let f = this.b64ToFile(data, file);
            return f;
        });
    }

    getNativeDirectory(subfolder) {
        if (this.coreConfig.isCordova()) {
            return this.fileNative.resolveDirectoryUrl(this.fileNative.dataDirectory).then(dataDirectory => {
                return this.fileNative.getDirectory(dataDirectory, subfolder, { create: true });
            });
        } else {
            return new Promise((resolve, reject) => {
                (<any>window).requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, (fileSys) => {
                    fileSys.root.getDirectory(subfolder, {
                        create: true
                    }, (directory) => {
                        resolve(directory);
                    });
                });
            });
        }
    }

    resolveFilePath(filePath: string) {
        if (this.coreConfig.isCordova()) {
            if (filePath.indexOf('/var/mobile') === 0) {
                filePath = 'file://' + filePath;
            }
            return this.fileNative.resolveLocalFilesystemUrl(filePath)
                .then((fileEntry: any) => {
                    return fileEntry;
                }).catch(err => {
                    let fileError = err && err.message ? err.message : 'File Error';
                    // For IOS, if the app is updated, the original file path won't be found because the image directory url is changed.
                    // Therefore, we need to change the incorrect directory url part in the original file path to retrieve the file successfully.
                    if (this.coreConfig.isIOS() && fileError === 'NOT_FOUND_ERR') {
                        return this.getNativeDirectory('images').then((directory: any) => {
                            let pathPartials = filePath.split('/');
                            let directoryPartials = directory.nativeURL.split('/');
                            // directoryPartials[8] is the changed part
                            filePath = filePath.replace(pathPartials[8], directoryPartials[8]);
                            return this.fileNative.resolveLocalFilesystemUrl(filePath)
                                .then((fileEntry: any) => {
                                    return fileEntry;
                                }, () => {
                                    return Promise.reject(fileError);
                                });
                        }, () => {
                            return Promise.reject(fileError);
                        });
                    }
                    return Promise.reject(fileError);
                });
        } else {
            return new Promise((resolve, reject) => {
                (<any>window).resolveLocalFileSystemURL(filePath, (fileEntry) => resolve(fileEntry), (err) => reject(err));
            });
        }
    }

    fixImageOrientation(path, fileName) {
        return this.fileNative.readAsArrayBuffer(path, fileName).then(arrayBuffer => {
            let view;
            try {
                view = new DataView(arrayBuffer);
            } catch (error) {
                return Promise.reject(error);
            }
            if (view.getUint16(0, false) !== 0xFFD8) {
                return view;
            }
            let length = view.byteLength, offset = 2;
            while (offset < length) {
                let marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        return view;
                    }
                    let little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    let tags = view.getUint16(offset, little);
                    offset += 2;
                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            let orientation = view.getUint16(offset + (i * 12) + 8, little);
                            if (orientation !== 0) {
                                view.setUint16(offset + (i * 12) + 8, 0);
                            }
                            return view;
                        }
                    }
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else {
                    offset += view.getUint16(offset, false);
                }
            }
            return view;
        });
    }

    //should only be called in cordova
    moveToImageDirectory(originalFilePath: string, disableOrientationFix: boolean = false): Promise<string> {
        if (!this.coreConfig.isCordova()) {
            return Promise.resolve(originalFilePath);
        } else {
            return this.fileNative.resolveLocalFilesystemUrl(originalFilePath).then((fileEntry: any) => {
                // For samsung device image, modify the image exif before saving to the new path
                let pathPartials = originalFilePath.split('/');
                pathPartials.pop();
                let fileDirPath = pathPartials.join('/');

                let newName;
                try {
                    newName = uuid.v4() + '.' + this.getExtension(originalFilePath);
                } catch (err) {
                    newName = Math.random().toString(36).substr(2) + '.' + this.getExtension(originalFilePath);
                }
                if (disableOrientationFix !== true && this.coreConfig.isCordova() && this.coreConfig.isSamsung()) {
                    return this.promiseService.promiseTimeout(5000, this.fixImageOrientation(fileDirPath, fileEntry.name))
                        .then(fixedDataView => {
                            return this.getNativeDirectory('images').then((directory: any) => {
                                let blob = new Blob([fixedDataView], { type: 'octet/stream' });
                                return this.fileNativeWriteFile(directory.nativeURL, newName, blob, { replace: true });
                            }, (err) => {
                                return originalFilePath;
                            });
                        }, (err) => {
                            return this.moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
                        });
                } else {
                    return this.moveToImageDirectoryBase(fileDirPath, fileEntry, newName, originalFilePath);
                }
            });
        }
    }

    moveToImageDirectoryBase(fileDirPath: string, fileEntry: any, newName: string, originalFilePath: string) {
        return this.getNativeDirectory('images').then((directory: any) => {
            return this.fileNative.copyFile(fileDirPath, fileEntry.name, directory.nativeURL, newName).then(newFileEntry => {
                return newFileEntry.nativeURL;
            });
        }, (err) => {
            return originalFilePath;
        });
    }

    fileNativeWriteFile(path, fileName, text, options) {
        return this.fileNative.writeFile(path, fileName, text, options).then((fileEntry: any) => {
            return fileEntry.nativeURL;
        }, (err) => {
        });
    }

    fileNativeCheckFile(path, fileName) {
        return this.fileNative.checkFile(path, fileName).then((fileExists) => {
            return true;
        }, (err) => {
            return false;
        });
    }

    fixAbsolutePath(data: string) {
        if (this.coreConfig.isCordova() && this.device.platform === 'iOS') {
            if (data && data.indexOf('file://') >= 0) {
                let path = data;
                let indexApp = path.indexOf('/Application/');
                let indexLibrary = path.indexOf('/Library/');
                if (indexApp > 0 && indexLibrary > 0) {
                    return this.getNativeDirectory('images').then((directory: any) => {
                        let directoryPath = directory.nativeURL;
                        let indexAppDirectory = directoryPath.indexOf('/Application/');
                        let indexLibraryDirectory = directoryPath.indexOf('/Library/');
                        let UUID = directoryPath.substring(indexAppDirectory + 13, indexLibraryDirectory);
                        data = path.substring(0, indexApp) + '/Application/' + UUID + path.substring(indexLibrary);
                        return data;
                    }, (err) => {
                        this.log.log(err);
                        return data;
                    });
                } else {
                    return Promise.resolve(data);
                }
            } else {
                return Promise.resolve(data);
            }
        } else {
            return Promise.resolve(data);
        }
    }

    getCloudinaryUrl(retVal) {
        if (!retVal || !retVal.cloudinary) {
            return null;
        }
        return retVal.cloudinary.eager && retVal.cloudinary.eager.length > 0 ? retVal.cloudinary.eager[0].secure_url || retVal.cloudinary.eager[0].url : retVal.cloudinary.secure_url || retVal.cloudinary.url;
    }

    downloadFile(filename, mediaType, url, options) {
        return this.rq.downloadFile(filename, mediaType, url, options);
    }

    downloadFileToDevice(source, target) {
        let fileTransfer = this.transfer.create();
        return fileTransfer.download(source, target);
    }

    uploadProxy(photoUrl: string): Observable<any> {
        let url = this.config.uploadProxyUrl;
        return this.rq.post(url, { url: photoUrl }).pipe(map(retVal => {
            return this.getCloudinaryUrl({ cloudinary: retVal });
        }));
    }

    exportToFile(content, type, encoding, filename) {
        encoding = encoding || 'charset=ISO-8859-1';
        filename = filename || 'data.csv';
        type = type || 'data:application/csv;charset=ISO-8859-1;';

        if (encoding === 'base64') {
            content = this.b64toBlob(content, type);
        }
        let blob = new Blob([content], {
            type: type
        });
        return this.rq.saveBlob(blob, filename);
    }

    getLocalFilePath() {
        let path = '';
        if (this.coreConfig.isIOS()) {
            path = (<any>window.cordova).file.documentsDirectory;
        } else {
            path = (<any>window.cordova).file.externalDataDirectory;
        }
        return path;
    }

    getLocalFileName(fileName: string) {
        let newfileName = this.cleanFileName(fileName);
        newfileName = newfileName.toLowerCase().replace(/[^a-zA-Z0-9.]+/g, '_');
        return newfileName;
    }

    saveToLocalFile(blob, fileName) {
        let path = this.getLocalFilePath();
        fileName = this.getLocalFileName(fileName);
        let promise = this.fileNative.writeFile(path, fileName, blob, {
            append: false, replace: true
        });
        // this.log.log(path);
        // this.log.log(fileName);
        return promise;
    }

    openBlob(blob, fileName: string, mimeType: string) {
        // let isPromiseResolved = false;
        // setTimeout(() => {
        //     if (!isPromiseResolved) {
        //         let path = this.getLocalFilePath();
        //         fileName = this.getLocalFileName(fileName);
        //         this.afterOpenBlob(path + fileName, mimeType);
        //     }
        // }, 1000);
        return this.saveToLocalFile(blob, fileName).then((file: any) => {
            // isPromiseResolved = true;
            this.afterOpenBlob(file.nativeURL, mimeType);
        }, (err) => {
            this.log.error(err);
        }).catch(err => {
            this.log.error(err);
        });

    }

    afterOpenBlob(filePath, mimeType) {
        // this.log.log(filePath);
        return this.fileOpener.open(filePath, mimeType).then(() => { }, err => {
            this.log.error(err);
        });
    }

    getUrlWithAnnotations(src: string, photo?: any) {
        let value = clone(src);
        if (photo && photo.edit && photo.edit.indexOf('cloudinary') > 0) {
            let i = photo.edit.lastIndexOf('/');
            let j = photo.edit.lastIndexOf('.');
            let publicId = photo.edit.substr(i + 1, j - i - 1);
            let k = value.indexOf('upload/') + 7;
            value = value.slice(0, k) + 'l_' + publicId + ',w_1.0,h_1.0,fl_relative,c_fill' + value.slice(k - 1);
        } else if (photo && photo.edit && photo.edit.indexOf('storage.googleapis.com') > 0) {
            value = photo.edit;
        }
        return value;
    }

    cleanFileName(fileName: string) {
        if (fileName && fileName.normalize) {
            fileName = fileName.normalize('NFD');
        }
        if (fileName && fileName.replace) {
            fileName = fileName.replace(/[\u0300-\u036f]/g, '');
        }
        return fileName || 'EMPTY';
    }

    _requestExternalStoragePermission() {
        return new Promise((resolve, reject) => {
            if (this.coreConfig.isAndroid() && this.coreConfig.isCordova()) {
                let permissions = (<any>window.cordova.plugins).permissions;
                permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, (initialStatus) => {
                    if (!initialStatus.hasPermission) {
                        let errorCallback = () => {
                            this.log.error('Storage permission is not turned on');
                            reject(false);
                        };
                        permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, (status) => {
                            if (!status.hasPermission) {
                                errorCallback();
                            } else {
                                resolve(true);
                            }
                        }, errorCallback);
                    } else {
                        resolve(true);
                    }
                });
            } else {
                resolve(true);
            }
        });
    }
}
