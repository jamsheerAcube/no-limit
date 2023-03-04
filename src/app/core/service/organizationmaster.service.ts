import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocationMasterModel } from '../../shared/model//LocationMasterModel';
import { OrganizationMasterModel } from 'src/app/shared/model/OrganizationMasterModel';

@Injectable({
    providedIn: 'root'
})
export class OrganizationmasterService {
    organizationnmasterDataCache: OrganizationMasterModel[] = [];
    token = localStorage.getItem('access_token');
    organizationMasterDataByKey!: OrganizationMasterModel;
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

    private locationMasterUrl = `${environment.apiUrl}/Organization`;

    async getOrganizationMaster(forceRefresh:boolean=false) {
        if(forceRefresh)
        {
            const data = await this.http.get<OrganizationMasterModel[]>(this.locationMasterUrl, this.httpOptions)
                .toPromise();
            this.organizationnmasterDataCache = data;
            return data; 
        }
        else
        {
            if (!(this.organizationnmasterDataCache.length > 0)) {
                const data = await this.http.get<OrganizationMasterModel[]>(this.locationMasterUrl, this.httpOptions)
                    .toPromise();
                this.organizationnmasterDataCache = data;
                return data;
            }
            else {
                return this.organizationnmasterDataCache;
            }
        }
    }

    async onRefreshOrganizationmaster() {
        const data = await this.http.get<OrganizationMasterModel[]>(this.locationMasterUrl, this.httpOptions)
            .toPromise();
        this.organizationnmasterDataCache = data;
        return data;
    }

    addorganizationmaster(organizationmastermodel: OrganizationMasterModel) {
        return this.http.post<any>(`${environment.apiUrl}/Organization`,
        organizationmastermodel
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    editOrganizationmaster(organizationmastermodel: OrganizationMasterModel) {
        return this.http.put<any>(`${environment.apiUrl}/Organization/` + organizationmastermodel.orgID,
        organizationmastermodel, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    getOrganizationMasterByKey(orgID: number) {
        return this.organizationnmasterDataCache.find(item => item.orgID == orgID);
    }

    AddOrEditRecordToCache(orgmastermodel: OrganizationMasterModel, editMode: boolean) {
        if (editMode) {
            const objIndex = this.organizationnmasterDataCache.findIndex(item => item.orgID == orgmastermodel.orgID);
            this.organizationnmasterDataCache[objIndex] = orgmastermodel;
        }
        else {
            this.organizationnmasterDataCache.push(orgmastermodel);
            this.organizationnmasterDataCache.sort((a, b) => (a.orgCode > b.orgCode) ? 1 : -1);
        }
    }

    DeleteOrganizationMaster(orgID: number) {
        return this.http.delete<any>(`${environment.apiUrl}/Organization/` + orgID, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    DeleteFromCache(orgID: number) {
        const objIndex = this.organizationnmasterDataCache.findIndex(item => item.orgID == orgID);
        this.organizationnmasterDataCache.splice(objIndex, 1);

    }
}