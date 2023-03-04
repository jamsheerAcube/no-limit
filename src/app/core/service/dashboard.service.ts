import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AssetAuditModel, AuditAssetSummary } from 'src/app/shared/model/AssetAuditModel';
import { AuditReport } from 'src/app/shared/model/auditreport';
import { DemoPrintModel } from 'src/app/shared/model/DemoPrintModel';
import { environment } from '../../../environments/environment';
import { DashboardCardsGroupModel } from '../../shared/model/DashboardCardsGroupModel';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    dashboardCardsGroupDataCache!: DashboardCardsGroupModel;
    token = localStorage.getItem('access_token');
    dashboardCardsGroupDataByKey!: DashboardCardsGroupModel;
    headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.token)
        .set('Content-Type', 'application/json');
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient,
        private router: Router) { }

    private dashboardUrl = `${environment.apiUrl}/Dashboard`;

    async getDashboardCardsGroup() : Promise<DashboardCardsGroupModel>{
        if (!this.dashboardCardsGroupDataCache) {
            this.dashboardCardsGroupDataCache  = await this.http.get<DashboardCardsGroupModel>(this.dashboardUrl + '/cardsgroup' , this.httpOptions).toPromise();
             return this.dashboardCardsGroupDataCache;
        }
        else {
            return this.dashboardCardsGroupDataCache;
        }
    }

    async getLast10Audits(){
        const data  = await this.http.get<AssetAuditModel[]>(this.dashboardUrl + '/Last10Audit' , this.httpOptions).toPromise();
        return data;
        
    }

    async getExpiringItems(days:any){
        const data  = await this.http.get<DemoPrintModel[]>(this.dashboardUrl + '/ExpiringItems/' + days , this.httpOptions).toPromise();
        return data;
        
    }

    
}