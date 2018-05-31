import { Injectable } from '@angular/core';
//import { WorkBook, read, readFile, utils, SSF, write } from 'xlsx';
import * as XLSX from 'xlsx';
//const XLSX = require('xlsx');
import { moment } from '@shared/interfaces';

import * as FileSaver from 'file-saver';
import { parse } from 'papaparse';

import { forEach, get, isArray, isObject, isNumber, keys, find, isDate } from 'lodash-es';

//declare const System: System;

@Injectable()
export class Xlsx {

    // private _xlsx: any;
    // private _papaparse: any;

    constructor() { }

    // getXlsx() {
    //     if (this._xlsx) {
    //         return Promise.resolve(this._xlsx);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'xlsx').then((xlsx) => {
    //         this._xlsx = xlsx;
    //         return xlsx;
    //     });
    // }

    // getPapaParse() {
    //     if (this._papaparse) {
    //         return Promise.resolve(this._papaparse);
    //     }
    //     return System.import(/* webpackChunkName: "xlsx" */'papaparse').then((papaparse) => {
    //         this._papaparse = papaparse;
    //         return papaparse;
    //     });
    // }

    readFile(nativeFile: File | Blob, type = 'blob', encoding?: string): Promise<string> {
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

    read(file: File) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then(data => {
            let csv = '';
            if (file.name.endsWith('csv')) {
                csv = data;
            } else {
                let workbook = XLSX.read(data, { type: 'binary' });
                let worksheet = workbook.Sheets[workbook.SheetNames[0]];
                csv = XLSX.utils['sheet_to_csv'](worksheet, { FS: ';' });
            }
            let retVal = parse(csv, { skipEmptyLines: true });
            return retVal.data;
        });
        //});
        //});
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
        return this.saveBlob(blob, filename);
    }

    saveBlob(blob: Blob, filename: string) {
        FileSaver.saveAs(blob, filename);
    }

    getBase64MimeType(base64) {
        return base64.split(';')[0].replace('data:', '');
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

    readSheets(file: File) {
        //return this.getXlsx().then((xlsx: any) => {
        //return this.getPapaParse().then((papaparse: any) => {
        return this.readFile(file, 'binary').then(data => {
            let retVal = [];
            if (file.name.endsWith('csv')) {
                retVal.push(parse(data, { skipEmptyLines: true }).data);
            } else {
                let workbook = XLSX.read(data, { type: 'binary' });
                workbook.SheetNames.forEach(sheet => {
                    let v = XLSX.utils['sheet_to_csv'](workbook.Sheets[sheet], { FS: ';' });
                    retVal.push(parse(v, { skipEmptyLines: true }).data);
                });
            }
            return retVal;
        });
        //});
        //});
    }

    write(title: string, sheets: Array<{ columns: Array<any>, data: Array<any>, title: string }>) {
        //return this.getXlsx().then((xlsx: any) => {
        let tables = new Array<any>();
        let headers = new Array<any>();
        forEach(sheets, (s) => {
            let hasHeader = false;
            let table = [];
            let header = [];
            forEach(s.data, function (d) {
                let row = [];
                forEach(s.columns, function (c) {
                    if (!((c.visible === false || c.suppressExport === true || c.action) && c.forceExport !== true)) {
                        let value: any = get(d, c.name);
                        if (c.type === 'address') {
                            value = value && value.address ? value.address : value;
                            if (typeof value === 'object') {
                                value = null;
                            }
                        }
                        if (c.type === 'catalog') {
                            delete value.valid;
                            let retVal = '';
                            keys(value).forEach(function (pid) {
                                let product = find(c.products, (p: any) => {
                                    return p._id === pid;
                                });
                                if (product) {
                                    retVal += product.reference + ' * ' + value[pid] + ',';
                                }
                            });
                            value = retVal; //JSON.stringify(value).replace('{', '').replace('}', '');
                        }
                        if (c.type === 'date' && value) {
                            let m = moment(value);
                            m = m.add(m.utcOffset(), 'minutes');
                            value = m.toDate();
                        }
                        if (c.type === 'time' && value) {
                            let t = moment(value);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value = t.format('HH:mm:ss');
                        }
                        if (c.type === 'datetime' && value) {
                            let dt = moment(value);
                            //t = t.add(t.utcOffset(), 'minutes');
                            value = dt.format('L LT');
                        }
                        if (c.name === '_acl') {
                            value = value.groups.r; //_difference(value.groups.r, roles);
                        }
                        if (value && value._downloadURL) {
                            value = value._downloadURL;
                        }
                        if (isObject(value) && !isDate(value) && !isArray(value)) { //&& _isEmpty(value)
                            value = null;
                        }

                        row.push(value);
                        if (!hasHeader) {
                            header.push(c.displayName || c.name);
                        }
                    }
                });
                hasHeader = true;
                table.push(row);
            });
            tables.push(table);
            headers.push(header);
        });
        let wb = { SheetNames: [], Sheets: {}, Props: null };
        for (let i = 0; i < tables.length; i++) {
            tables[i].unshift(headers[i]);
            let wsName = sheets[i].title || 'SheetJs_' + i;
            let ws = this.sheetFromArrayOfArrays(tables[i]);
            wb.SheetNames.push(wsName);
            wb.Sheets[wsName] = ws;
        }
        let wbout = XLSX.write(wb, <any>{ bookType: 'xlsx', bookSST: true, type: 'binary' });
        let filename = title + '-' + moment().format('YYYY-MM-DDTHH:MM') + '.xlsx';
        this.exportToFile(this.s2ab(wbout), 'application/octet-stream', '', filename);
        //});
    }

    private datenum(v: any, date1904?: boolean) {
        if (date1904) {
            v += 1462;
        }
        let epoch: any = Date.parse(v);
        return (epoch - <any>(new Date(Date.UTC(1899, 11, 30)))) / (24 * 60 * 60 * 1000);
    }

    private sheetFromArrayOfArrays(data, opts?) {
        let ws = {};
        let range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
        for (let R = 0; R !== data.length; ++R) {
            for (let C = 0; C !== data[R].length; ++C) {
                if (range.s.r > R) {
                    range.s.r = R;
                }
                if (range.s.c > C) {
                    range.s.c = C;
                }
                if (range.e.r < R) {
                    range.e.r = R;
                }
                if (range.e.c < C) {
                    range.e.c = C;
                }
                let cell: any = {
                    v: data[R][C]
                };
                if (cell.v === null) {
                    continue;
                }

                let cellRef = XLSX.utils.encode_cell({ c: C, r: R });

                if (typeof cell.v === 'number') {
                    cell.t = 'n';
                } else if (typeof cell.v === 'boolean') {
                    cell.t = 'b';
                } else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = (<any>XLSX.SSF)._table[14];
                    cell.v = this.datenum(cell.v);
                } else if (isArray(cell.v) && cell.v.length > 0 && isNumber(cell.v[0])) {
                    cell.t = 's';
                    cell.v = '[' + cell.v.join(',') + ']';
                } else if (isArray(cell.v) && cell.v.length > 0 && !isNumber(cell.v[0])) {
                    cell.t = 's';
                    cell.v = cell.v.join(',');
                } else if (isArray(cell.v) && cell.v.length === 0) {
                    cell.t = 's';
                    cell.v = '';
                } else {
                    cell.t = 's';
                }

                ws[cellRef] = cell;
            }
        }
        if (range.s.c < 10000000) {
            ws['!ref'] = XLSX.utils.encode_range(range.s, range.e);
        }
        return ws;
    }

    private s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

}
