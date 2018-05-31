import { Injectable } from '@angular/core';
import { Requestor } from '../requestor/requestor.service';
import { Files } from '../files/files.service';
import { Config } from '../config/config.service';
import { Models } from '../models/models.service';
import { Authentication } from '../authentication/authentication.service';
import { IFormField, Query, SubQuery, FormFieldType } from '@shared/interfaces';
import { compact, sortBy, cloneDeep, uniq } from 'lodash-es';

@Injectable()
export class Print {

    protected excludedDashboardColumns: Array<string> = ['validated', 'validatedBy', 'owner.username', 'creator.username', 'user.username'];

    constructor(protected rq: Requestor, protected config: Config, protected authentication: Authentication, protected files: Files) { }

    printToSpreadsheet(collectionName: string, columns: Array<IFormField>, query: Query, subQuery: SubQuery, aggregateOptions: Array<any>, channel: string, type: string, collectionFields: Array<IFormField>, filename?: string) {
        let url = this.config.apiUrl + 'print/write-spreadsheet';
        let fixedCollectionName = Models.fixCollectionName(collectionName);
        type = type === 'csv' ? 'csv' : 'xlsx';
        //query.limit = 25500;
        if (subQuery) {
            query.subQuery = subQuery;
        }

        let model = Models.getModelByCollectionName(collectionName);
        query.include = model.include;

        let exportColumns = sortBy(cloneDeep(columns.filter(c => !c.suppressExport)), c => c.exportOrder || 100).map((c: any) => {
            if (c.field) {
                c.field = c.field.replace(/\?/g, '');
            }
            return c;
        });

        if (this.authentication.isDashboard()) {
            exportColumns = exportColumns.filter(c => this.excludedDashboardColumns.indexOf(c.field) < 0);
        }
        let mime = type === 'csv' ? 'text/plain' : 'application/xlsx';
        filename = this.files.cleanFileName((filename || fixedCollectionName)) + this.rq.getFilenameSuffix() + '.' + type;
        let cacheQuery: any = {};
        if (collectionFields && collectionFields.length > 0) {
            let catalogs = uniq(collectionFields.filter(f => f.type === FormFieldType.catalog).map(f => f.catalog));
            if (catalogs.length > 0) {
                cacheQuery.products = { where: { catalogRef: { inq: catalogs } } };
            }
            let collectionNames = compact(uniq(collectionFields.filter(f => f.type === FormFieldType.autocomplete).map(f => f.collectionName)));
            if (collectionNames.length > 0) {
                cacheQuery.custommodels = { where: { name: { inq: collectionNames } }, cacheKey: 'name' };
            }
        }

        let body = { collectionName: fixedCollectionName, columns: exportColumns, query, aggregateOptions, channel, type, cacheQuery };
        return this.rq.downloadFile(filename, mime, url, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: body });
    }
}
