import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonValueListModel } from '../../shared/model/CommonValueListModel';
import { ValueListNames } from '../../shared/model/ValueListNames';

@Injectable({
  providedIn: 'root'
})
export class CommonValueListService {
  commonValueListDataCache: CommonValueListModel[] = [];
  token = localStorage.getItem('access_token');
  commonValueListDataByKey!: CommonValueListModel;
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

  private commonValueListMasterUrl = `${environment.apiUrl}/Valuelist`;

  async getCommonValueListMaster() {
    if (!(this.commonValueListDataCache.length > 0)) {
      const data = await this.http.get<CommonValueListModel[]>(this.commonValueListMasterUrl, this.httpOptions)
        .toPromise();
      this.commonValueListDataCache = data;
      return data;
    }
    else {
      return this.commonValueListDataCache;
    }
  }

  async onRefreshCommonValueListmaster() {
    const data = await this.http.get<CommonValueListModel[]>(this.commonValueListMasterUrl, this.httpOptions)
      .toPromise();
    this.commonValueListDataCache = data;
    return data;
  }

  async getListNames() {
    const data = await this.http.get<ValueListNames[]>(this.commonValueListMasterUrl + '/listsnames', this.httpOptions)
      .toPromise();
    return data;
  }

  async getAssetStatusItems() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'AssetStatus');
  }

  async getMaintenanceStatusItems() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'MaintenanceStatus');
  }
  async getAssetConditionItems() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'AssetCondition');
  }

  async getUOMItems() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'UOM');
  }
  async getLoanTypeItems() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'LoanType');
  }
  async getAssetDisposalStatusItems() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'AssetDisposalStatus');
  }

  async getMaintenanceTypes() {
    if (!(this.commonValueListDataCache.length > 0)) {
      await this.getCommonValueListMaster();
    }
    return this.commonValueListDataCache.filter(x => x.listName === 'MaintenanceType');
  }

  addCommonValueListmaster(commonValueListmodel: CommonValueListModel) {
    return this.http.post<any>(`${environment.apiUrl}/Valuelist`,
      commonValueListmodel
      , this.httpOptions)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  editCommonValueListmaster(commonValueListmodel: CommonValueListModel) {
    return this.http.put<any>(`${environment.apiUrl}/Valuelist/` + commonValueListmodel.listName + '/' + commonValueListmodel.value,
      commonValueListmodel, this.httpOptions)
      .pipe(tap((res: any) => {
        return res;
      }));
  }
  getCommonValueListMasterByKey(valueID: string) {
    return this.commonValueListDataCache.find(item => item.value == valueID);
  }

  AddOrEditRecordToCache(commonValueListmodel: CommonValueListModel, editMode: boolean) {
    if (editMode) {
      const objIndex = this.commonValueListDataCache.findIndex(item => item.value == commonValueListmodel.value);
      this.commonValueListDataCache[objIndex] = commonValueListmodel;
    }
    else {
      this.commonValueListDataCache.push(commonValueListmodel);
      this.commonValueListDataCache.sort((a, b) => (a.value > b.value) ? 1 : -1);
    }
  }


}
