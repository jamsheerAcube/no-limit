import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EmployeeMasterModel } from '../../shared/model//EmployeeMasterModel';

@Injectable({
    providedIn: 'root'
})
export class EmployeeMasterService {
    employeeMasterDataCache: EmployeeMasterModel[] = [];
    token = localStorage.getItem('access_token');
    employeeMasterDataByKey!: EmployeeMasterModel;
    selectedrowevent = new Subject<any>();
    refreshClickevent = new Subject<any>();
    headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.token);
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient,
        private router: Router) { }

    private employeeMasterUrl = `${environment.apiUrl}/Employee`;

    async getEmployeeMaster() {
        if (!(this.employeeMasterDataCache.length > 0)) {
            const data = await this.http.get<EmployeeMasterModel[]>(this.employeeMasterUrl, this.httpOptions)
                .toPromise();
            this.employeeMasterDataCache = data;
            return data;
        }
        else {
            return this.employeeMasterDataCache;
        }
    }

    async onRefreshEmployeeMaster() {
        const data = await this.http.get<EmployeeMasterModel[]>(this.employeeMasterUrl, this.httpOptions)
            .toPromise();
        this.employeeMasterDataCache = data;
        return this.employeeMasterDataCache;
    }

    addEmployeemaster(formData: FormData) {
        return this.http.post<any>(`${environment.apiUrl}/Employee`,
        formData
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    editEmployeemaster(formData: FormData, employeeId: number) {
        return this.http.put<any>(`${environment.apiUrl}/Employee/` + employeeId,
        formData, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    getEmployeeMasterByKey(employeeId: number) {
        return this.employeeMasterDataCache.find(item => item.employeeId == employeeId);
    }

    AddOrEditRecordToCache(employeeMasterModel: EmployeeMasterModel, editMode: boolean) {
        if (editMode) {
            const objIndex = this.employeeMasterDataCache.findIndex(item => item.employeeId == employeeMasterModel.employeeId);
            this.employeeMasterDataCache[objIndex] = employeeMasterModel;
        }
        else {
            this.employeeMasterDataCache.push(employeeMasterModel);
            this.employeeMasterDataCache.sort((a, b) => (a.employeeCode > b.employeeCode) ? 1 : -1);
        }
    }

    DeleteEmployeeMaster(employeeId: number) {
        return this.http.delete<any>(`${environment.apiUrl}/Employee/` + employeeId, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    DeleteFromCache(employeeId: number) {
        const objIndex = this.employeeMasterDataCache.findIndex(item => item.employeeId == employeeId);
        this.employeeMasterDataCache.splice(objIndex, 1);

    }
}