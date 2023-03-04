import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DepartmentMasterModel } from '../../shared/model/DepartmentMasterModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentmasterService {
  departmentmasterDataCache: DepartmentMasterModel[] = [];
  token = localStorage.getItem('access_token');
  departmentMasterDataByKey!: DepartmentMasterModel;
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

  private departmentMasterUrl = `${environment.apiUrl}/Department`;

  async getDepartmentMaster() {
    if (!(this.departmentmasterDataCache.length > 0)) {
      const data = await this.http.get<DepartmentMasterModel[]>(this.departmentMasterUrl, this.httpOptions)
        .toPromise();
      this.departmentmasterDataCache = data;
      return data;
    }
    else {
      return this.departmentmasterDataCache;
    }
  }

  async onRefreshDepartmentmaster() {
    const data = await this.http.get<DepartmentMasterModel[]>(this.departmentMasterUrl, this.httpOptions)
      .toPromise();
    this.departmentmasterDataCache = data;
    return data;
  }

  addDepartmentmaster(departmentmastermodel: DepartmentMasterModel) {
    return this.http.post<any>(`${environment.apiUrl}/Department`,
      departmentmastermodel
      , this.httpOptions)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  editDepartmentmaster(departmentmastermodel: DepartmentMasterModel) {
    return this.http.put<any>(`${environment.apiUrl}/Department/` + departmentmastermodel.departmentID,
      departmentmastermodel, this.httpOptions)
      .pipe(tap((res: any) => {
        return res;
      }));
  }
  getDepartmentMasterByKey(departmentID: number) {
    return this.departmentmasterDataCache.find(item => item.departmentID == departmentID);
  }

  AddOrEditRecordToCache(departmentmastermodel: DepartmentMasterModel, editMode: boolean) {
    if (editMode) {
      const objIndex = this.departmentmasterDataCache.findIndex(item => item.departmentID == departmentmastermodel.departmentID);
      this.departmentmasterDataCache[objIndex] = departmentmastermodel;
    }
    else {
      this.departmentmasterDataCache.push(departmentmastermodel);
      this.departmentmasterDataCache.sort((a, b) => (a.departmentCode > b.departmentCode) ? 1 : -1);
    }
  }

  DeleteDepartmentMaster(departmentID: number) {
    return this.http.delete<any>(`${environment.apiUrl}/Department/` + departmentID, this.httpOptions)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  DeleteFromCache(departmentID: number) {
    const objIndex = this.departmentmasterDataCache.findIndex(item => item.departmentID == departmentID);
    this.departmentmasterDataCache.splice(objIndex, 1);

  }
}
