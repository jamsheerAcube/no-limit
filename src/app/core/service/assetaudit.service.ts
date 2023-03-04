import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AssetAuditModel, AuditAssetSummary ,RS_AssetAuditModel} from 'src/app/shared/model/AssetAuditModel';

@Injectable({
    providedIn: 'root'
})
export class AssetAuditService {
    assetAuditDataCache: AssetAuditModel[] = [];
    assetAuditVerifyDataCache: AssetAuditModel[] = [];
    token = localStorage.getItem('access_token');
    assetAuditDataByKey!: AssetAuditModel;
    selectedrowevent = new Subject<any>();
    refreshClickevent = new Subject<any>();
    headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.token)
        .set('Content-Type', 'application/json');;
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient,
        private router: Router) { }

    private assetAuditUrl = `${environment.apiUrl}/Audit`;

    async getAssetAudit() {
        if (!(this.assetAuditDataCache.length > 0)) {
            const data = await this.http.get<AssetAuditModel[]>(this.assetAuditUrl+"/GetAllAudits", this.httpOptions)
                .toPromise();
            this.assetAuditDataCache = data;
            return data;
        }
        else {
            return this.assetAuditDataCache;
        }
    }



    async onRefreshAssetAudit() {
        const data = await this.http.get<AssetAuditModel[]>(this.assetAuditUrl+"/GetAllAudits", this.httpOptions)
            .toPromise();
        this.assetAuditDataCache = data;
        return this.assetAuditDataCache;
    }

    async getAuditAssetSummary(auditId: string) {
        const data = await this.http.get<AuditAssetSummary[]>(this.assetAuditUrl + '/' + auditId + '/GetAuditAssetDetails', this.httpOptions)
            .toPromise();
        return data;
    }

    addAssetAudit(assetAuditModel: AssetAuditModel) {
        return this.http.post<any>(`${environment.apiUrl}/Product/CreateAudit`,
            assetAuditModel
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    editAssetAuditmaster(assetAuditModel: AssetAuditModel) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + assetAuditModel.auditId,
            assetAuditModel, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    getAssetAuditByKey(auditId: string) {
        const data = this.http.get<any>(this.assetAuditUrl + '/GetById/' + auditId, this.httpOptions);
        return data;
    }

    async getAssetAuditVerifyDetails(auditId: string, forceRefresh: boolean = false) {
        if (forceRefresh) {
            const data = await this.http.get<AssetAuditModel>(this.assetAuditUrl + '/' + auditId + '/scandetails', this.httpOptions)
                .toPromise();
            this.assetAuditVerifyDataCache.push(data);
            return data;
        }
        else {
            if (!this.assetAuditVerifyDataCache.some(x => x.auditId === auditId)) {
                const data = await this.http.get<AssetAuditModel>(this.assetAuditUrl + '/' + auditId + '/scandetails', this.httpOptions)
                    .toPromise();
                this.assetAuditVerifyDataCache.push(data);
                return data;
            } else {
                return this.assetAuditVerifyDataCache.filter(x => x.auditId === auditId)[0];
            }
        }

    }

    DeleteAssetAudit(auditId: string) {
        return this.http.delete<any>(`${environment.apiUrl}/Audit/` + auditId, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    DeleteFromCache(additionalCostId: string) {
        const objIndex = this.assetAuditDataCache.findIndex(item => item.auditId == additionalCostId);
        this.assetAuditDataCache.splice(objIndex, 1);

    }

    AddOrEditRecordToCache(additionalCostDetailsModel: AssetAuditModel, editMode: boolean) {
        debugger;
        if (editMode) {
            console.log(this.assetAuditDataCache);
            const objIndex = this.assetAuditDataCache.findIndex(item => item.auditId == additionalCostDetailsModel.auditId);
            this.assetAuditDataCache[objIndex] = additionalCostDetailsModel;
        }
        else {
            this.assetAuditDataCache.push(additionalCostDetailsModel);
            this.assetAuditDataCache.sort((a, b) => (a.auditId > b.auditId) ? 1 : -1);
        }
    }

    async getAuditVerifyDetailsByStatus(auditId: string, status: number) {
        var auditRecord = await (await this.getAssetAuditVerifyDetails(auditId, true)).serialNos;
        return auditRecord ? auditRecord.filter(x => x.lineStatus == status) : [];
    }

    acceptLocationChange(auditId: string, serielNos: string[]) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + auditId + '/acceptlocationmismatch',
            serielNos, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    inActivateSerialNo(auditId: string, serielNos: string[]) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + auditId + '/inactivateserialno',
            serielNos, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    ActivateSerialNo(auditId: string, serielNos: string[]) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + auditId + '/activateserialno',
            serielNos, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    Rescan(auditId: string) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + auditId + '/rescan',
            null, this.httpOptions)
            .pipe(tap((res: any) => {
                const objIndex = this.assetAuditVerifyDataCache.findIndex(item => item.auditId == auditId);
                this.assetAuditVerifyDataCache.splice(objIndex, 1);
                return res;
            }));
    }

    CloseAuditMaster(auditId: string) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + auditId + '/CloseAudit',
            null, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    RleaseAuditMaster(auditId: string) {
        return this.http.put<any>(`${environment.apiUrl}/Audit/` + auditId + '/ReleaseAudit',
            null, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    async getLifeStyle() {
        return await this.http.get<any[]>(`${environment.apiUrl}/Product/GetLifeStyles/`, this.httpOptions).toPromise();
    }
    async getProductDepartment() {
        return await this.http.get<any[]>(`${environment.apiUrl}/Product/GetDepartment/`, this.httpOptions).toPromise();
    }
}