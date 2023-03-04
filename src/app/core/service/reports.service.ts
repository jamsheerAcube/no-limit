import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AssetAuditModel, AuditFilter } from 'src/app/shared/model/AssetAuditModel';
import { AssetCountAssetStatusWiseModel } from 'src/app/shared/model/AssetCountAssetStatusWiseModel';
import { AssetCountCategoryWiseModel } from 'src/app/shared/model/assetCountCategoryWiseModel';
import { DemoPrintModel, prinrFilter } from 'src/app/shared/model/DemoPrintModel';
import { LocationMasterModel } from 'src/app/shared/model/LocationMasterModel';
import { LocationWiseFilterReport } from 'src/app/shared/model/LocationWiseReport';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    viewFlag: Subject<boolean> = new Subject<boolean>();
    token = localStorage.getItem('access_token');
    locationWiseReportSummaryFilter: LocationWiseFilterReport = new LocationWiseFilterReport;
    headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.token)
        .set('Content-Type', 'application/json');
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient,
        private router: Router) { }

    private reportsUrl = `${environment.apiUrl}/Reports`;



    setViewFlag(dir: boolean) {
        this.viewFlag.next(dir);
    }



    async getLocationWiseReport(locationFilterReport: LocationWiseFilterReport) {
        return await this.http.post<LocationMasterModel[]>(this.reportsUrl + '/assets/locationwisecount', locationFilterReport, this.httpOptions)
            .toPromise();
    }

    async getBatchList(_printFilter: prinrFilter) {
        return await this.http.post<DemoPrintModel[]>(this.reportsUrl + '/GetBatchList', _printFilter, this.httpOptions)
            .toPromise();
    }

    async getPrintedHistory(_printFilter: prinrFilter) {
        return await this.http.post<DemoPrintModel[]>(this.reportsUrl + '/GetPrintedHistory', _printFilter, this.httpOptions)
            .toPromise();
    }

    async getCurrentInventorySummaryList(_printFilter: prinrFilter) {
        return await this.http.post<DemoPrintModel[]>(this.reportsUrl + '/GetCurrentInventorySummary', _printFilter, this.httpOptions)
            .toPromise();
    }

    async getAuditInventorySummaryList(_Filter: AuditFilter) {
        return await this.http.post<AssetAuditModel[]>(this.reportsUrl + '/GetAuditSnapShotSummary', _Filter, this.httpOptions)
            .toPromise();
    }

    async getAuditHeaderReport(_Filter: AuditFilter) {
        return await this.http.post<AssetAuditModel[]>(this.reportsUrl + '/GetAuditHeader', _Filter, this.httpOptions)
            .toPromise();

    }

    async getAuditScannedSummaryReport(_Filter: AuditFilter) {
        return await this.http.post<AssetAuditModel[]>(this.reportsUrl + '/GetAuditScannedSummary', _Filter, this.httpOptions)
            .toPromise();

    }

    async getAuditScannedDetailReport(_Filter: AuditFilter) {
        return await this.http.post<AssetAuditModel[]>(this.reportsUrl + '/GetAuditScannedDetail', _Filter, this.httpOptions)
            .toPromise();

    }

    async getAuditInventoryReport(_Filter: AuditFilter) {
        return await this.http.post<AssetAuditModel[]>(this.reportsUrl + '/GetAuditInventoryDetail', _Filter, this.httpOptions)
            .toPromise();

    }
    
    UpdateSerialNoStatus(formData: any) {
        return this.http.post<any>( `${environment.apiUrl}` + '/Print/UpdateSerialNoStatus', formData, this.httpOptions).pipe(tap((res: any) => {
            return res;
        }));
    }

    AddSaleOrderNo(formData: any) {
        return this.http.post<any>( `${environment.apiUrl}` + '/Print/AddSalesOrderNo', formData, this.httpOptions).pipe(tap((res: any) => {
            return res;
        }));
    }

    UpdateSalesOrderNo(formData: any) {
        return this.http.post<any>( `${environment.apiUrl}` + '/Print/UpdateSalesOrderNo', formData, this.httpOptions).pipe(tap((res: any) => {
            return res;
        }));
    }

}