import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserRoleMasterModel } from 'src/app/shared/model/UserRoleMasterModel';

@Injectable({
  providedIn: 'root'
})
export class userrolemasterservice {
  userroleMasterDataCache: UserRoleMasterModel[] = [];
  token = localStorage.getItem('access_token');
  userroleDataByKey!: UserRoleMasterModel;
  selectedrowevent = new Subject<any>();
  refreshClickevent = new Subject<any>();

  constructor(private http: HttpClient) { }

  private colorMasterUrl = `${environment.apiUrl}/UserRole`;

  async getUserRoleMaster() {
    if (!(this.userroleMasterDataCache.length > 0)) {
      const data = await this.http.get<UserRoleMasterModel[]>(this.colorMasterUrl)
        .toPromise();
      this.userroleMasterDataCache = data;
      return data;
    }
    else {
      return this.userroleMasterDataCache;
    }
  }

  async onRefreshUserRoleMaster() {
    const data = await this.http.get<UserRoleMasterModel[]>(this.colorMasterUrl)
      .toPromise();
    this.userroleMasterDataCache = data;
    return data;
  }

  addUserRolemaster(userRoleMasterModel: UserRoleMasterModel) {
    return this.http.post<any>(`${environment.apiUrl}/UserRole`, userRoleMasterModel)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  editUserRoleMaster(userRoleMasterModel: UserRoleMasterModel) {
    return this.http.put<any>(`${environment.apiUrl}/UserRole/` + userRoleMasterModel.id, userRoleMasterModel)
      .pipe(tap((res: any) => {
        return res;
      }));
  }
  getUserRoleMasterByKey(ID: number) {
    return this.userroleMasterDataCache.find(item => item.id == ID);
  }

  AddOrEditRecordToCache(userRoleMasterModel: UserRoleMasterModel, editMode: boolean) {
    if (editMode) {
      const objIndex = this.userroleMasterDataCache.findIndex(item => item.id == userRoleMasterModel.id);
      this.userroleMasterDataCache[objIndex] = userRoleMasterModel;
    }
    else {
      this.userroleMasterDataCache.push(userRoleMasterModel);
      this.userroleMasterDataCache.sort((a, b) => (a.roleName > b.roleName) ? 1 : -1);
    }
  }

  DeleteMaster(ID: number) {
    return this.http.delete<any>(`${environment.apiUrl}/UserRole/` + ID)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  DeleteFromCache(ID: number) {
    const objIndex = this.userroleMasterDataCache.findIndex(item => item.id == ID);
    this.userroleMasterDataCache.splice(objIndex, 1);

  }
}
