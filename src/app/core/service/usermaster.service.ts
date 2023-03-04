import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserMasterModel } from 'src/app/shared/model/UserMasterModel';
import { ChangePasswordModel } from 'src/app/shared/model/ChangePasswordModel';

@Injectable({ providedIn: 'root' })
export class UserMasterService {
  userMasterDataCache: UserMasterModel[] = [];
  token = localStorage.getItem('access_token');
  userDataByKey!: UserMasterModel;
  selectedrowevent = new Subject<any>();
  refreshClickevent = new Subject<any>();

  constructor(private http: HttpClient) {

  }

  private userMasterUrl = `${environment.apiUrl}/User`;

  async getUserMaster(forceRefresh:boolean=false) {
    if(forceRefresh)
    {
      const data = await this.http.get<UserMasterModel[]>(this.userMasterUrl)
      .toPromise();
    this.userMasterDataCache = data;
    return data;
    }
    else
    {
      if (!(this.userMasterDataCache.length > 0)) {
        const data = await this.http.get<UserMasterModel[]>(this.userMasterUrl)
          .toPromise();
        this.userMasterDataCache = data;
        return data;
      }
      else {
        return this.userMasterDataCache;
      }
    }
  
  }

  async onRefreshUserMaster() {
    const data = await this.http.get<UserMasterModel[]>(this.userMasterUrl)
      .toPromise();
    this.userMasterDataCache = data;
    return data;
  }

  addUsermaster(userMasterModel: UserMasterModel) {
    return this.http.post<any>(`${environment.apiUrl}/User`,
      userMasterModel)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  updatePassword(changePasswordModel: ChangePasswordModel) {
    return this.http.post<any>(`${environment.apiUrl}/User/ChangePassword`,
      changePasswordModel)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  editUserMaster(userMasterModel: UserMasterModel) {
    return this.http.put<any>(`${environment.apiUrl}/User/` + userMasterModel.userName,
      userMasterModel)
      .pipe(tap((res: any) => {
        return res;
      }));
  }
  getUserMasterByKey(userName: any) {
    return this.userMasterDataCache.find(item => item.userName == userName);
  }

  AddOrEditRecordToCache(userMasterModel: UserMasterModel, editMode: boolean) {
    if (editMode) {
      const objIndex = this.userMasterDataCache.findIndex(item => item.userName == userMasterModel.userName);
      this.userMasterDataCache[objIndex] = userMasterModel;
    }
    else {
      this.userMasterDataCache.push(userMasterModel);
      this.userMasterDataCache.sort((a, b) => (a.userName > b.userName) ? 1 : -1);
    }
  }

  DeleteMaster(ID: string) {
    return this.http.delete<any>(`${environment.apiUrl}/User/` + ID)
      .pipe(tap((res: any) => {
        return res;
      }));
  }

  DeleteFromCache(ID: string) {
    const objIndex = this.userMasterDataCache.findIndex(item => item.userName == ID);
    this.userMasterDataCache.splice(objIndex, 1);
  }
}
