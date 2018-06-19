import { Observable } from 'rxjs';

export interface IBoxService {
    upload(documentUrl: string): Observable<any>;
    createViewingSession(boxId: string): Observable<any>;
    getViewingContent(contentUrl: string): Observable<any>;
}