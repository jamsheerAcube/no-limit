import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AssetVerificationModel } from '../../shared/model//AssetVerificationModel';

@Injectable({
    providedIn: 'root'
})
export class AssetVerificationService {
    assetVerificationDataCache: AssetVerificationModel[] = [];
    token = localStorage.getItem('access_token');
    assetVerificationDataByKey!: AssetVerificationModel;
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

    private assetVerificationUrl = `${environment.apiUrl}/AssetVerification`;

    async getAssetVerification() {
        if (!(this.assetVerificationDataCache.length > 0)) {
            const data = await this.http.get<AssetVerificationModel[]>(this.assetVerificationUrl, this.httpOptions)
                .toPromise();
            this.assetVerificationDataCache = data;
            return data;
        }
        else {
            return this.assetVerificationDataCache;
        }
    }

    async onRefreshAssetVerification() {
        const data = await this.http.get<AssetVerificationModel[]>(this.assetVerificationUrl, this.httpOptions)
            .toPromise();
        this.assetVerificationDataCache = data;
        return this.assetVerificationDataCache;
    }

    addAssetVerificationmaster(AssetVerificationModel: AssetVerificationModel) {
        return this.http.post<any>(`${environment.apiUrl}/AssetVerification`,
            AssetVerificationModel
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
   
    editAssetVerificationmaster(assetVerificationModel: AssetVerificationModel) {
        return this.http.put<any>(`${environment.apiUrl}/AssetVerification/` + assetVerificationModel.receiptId,
            assetVerificationModel, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    getAssetVerificationByKey(assetVerificationId: string) {
        return this.assetVerificationDataCache.find(item => item.receiptId == assetVerificationId);
    }

    DeleteAssetVerification(assetVerificationId: number) {
        return this.http.delete<any>(`${environment.apiUrl}/AssetVerification/` + assetVerificationId, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    DeleteFromCache(assetVerificationId: number) {
        const objIndex = this.assetVerificationDataCache.findIndex(item => item.receiptId == assetVerificationId.toString());
        this.assetVerificationDataCache.splice(objIndex, 1);

    }
}