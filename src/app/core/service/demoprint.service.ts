import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { DemoPrintModel, prinrFilter } from 'src/app/shared/model/DemoPrintModel';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class demoprintService {
    demoPrintDataCache: DemoPrintModel[] = [];
    token = localStorage.getItem('access_token');
    demoPrintDataCacheKey!: DemoPrintModel;
    selectedrowevent = new Subject<any>();
    refreshClickevent = new Subject<any>();
    headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.token)
        .set('Content-Type', 'application/json');
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient,
        private router: Router) { }

    private assetRegisterUrl = `${environment.apiUrl}/Print`;

    async getDataForPrint(_printFilter:prinrFilter) {
        const data = await this.http.post<DemoPrintModel[]>(this.assetRegisterUrl + '/GetTransactionSummaryData',_printFilter, this.httpOptions)
                .toPromise();
            return data;
    }

    async getPrintedData() {
        const data = await this.http.get<DemoPrintModel[]>(this.assetRegisterUrl + '/GetDataForReportGulfDrugs', this.httpOptions)
                .toPromise();
            return data;
    }

    addSerialNo(formData: DemoPrintModel[]) {
        return this.http.post<any>(this.assetRegisterUrl + '/AddSerialNo',
            formData
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    GetReprintData(formData: string[]) {
        return this.http.post<any>(this.assetRegisterUrl + '/GetReprintData',
            formData
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    
}