import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocationMasterModel } from '../../shared/model//LocationMasterModel';

@Injectable({
    providedIn: 'root'
})
export class LocationmasterService {
    locationmasterDataCache: LocationMasterModel[] = [];
    token = localStorage.getItem('access_token');
    locationMasterDataByKey!: LocationMasterModel;
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

    private locationMasterUrl = `${environment.apiUrl}/Location`;

    async getLocationMaster(forceRefresh:boolean=false) {
        if(forceRefresh)
        {
            const data = await this.http.get<LocationMasterModel[]>(this.locationMasterUrl, this.httpOptions)
            .toPromise();
        this.locationmasterDataCache = data;
        return data;
        }
        else
        {
            if (!(this.locationmasterDataCache.length > 0)) {
                const data = await this.http.get<LocationMasterModel[]>(this.locationMasterUrl, this.httpOptions)
                    .toPromise();
                this.locationmasterDataCache = data;
                return data;
            }
            else {
                return this.locationmasterDataCache;
            }
        }
      
    }

    async onRefreshLocationmaster() {
        const data = await this.http.get<LocationMasterModel[]>(this.locationMasterUrl, this.httpOptions)
            .toPromise();
        this.locationmasterDataCache = data;
        return data;
    }

    addLocationmaster(locationmastermodel: LocationMasterModel) {
        return this.http.post<any>(`${environment.apiUrl}/Location`,
            locationmastermodel
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    editLocationmaster(locationmastermodel: LocationMasterModel) {
        return this.http.put<any>(`${environment.apiUrl}/Location/` + locationmastermodel.locationID,
            locationmastermodel, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    getLocationMasterByKey(locationID: number) {
        return this.locationmasterDataCache.find(item => item.locationID == locationID);
    }

    AddOrEditRecordToCache(locationmastermodel: LocationMasterModel, editMode: boolean) {
        if (editMode) {
            const objIndex = this.locationmasterDataCache.findIndex(item => item.locationID == locationmastermodel.locationID);
            this.locationmasterDataCache[objIndex] = locationmastermodel;
        }
        else {
            this.locationmasterDataCache.push(locationmastermodel);
            this.locationmasterDataCache.sort((a, b) => (a.locationCode > b.locationCode) ? 1 : -1);
        }
    }

    DeleteLocationMaster(locationID: number) {
        return this.http.delete<any>(`${environment.apiUrl}/Location/` + locationID, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    DeleteFromCache(locationID: number) {
        const objIndex = this.locationmasterDataCache.findIndex(item => item.locationID == locationID);
        this.locationmasterDataCache.splice(objIndex, 1);

    }
}