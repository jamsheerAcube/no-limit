import { HttpClient, HttpHeaders } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AgInputNumberField } from 'ag-grid-community';
import { environment } from '../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserRoleMasterModel } from 'src/app/shared/model/UserRoleMasterModel';
import { AppMenuModel } from 'src/app/shared/model/AppMenuModel';

@Injectable({
  providedIn: 'root'
})
export class rolepermissionservice {
  userroleMasterDataCache: UserRoleMasterModel[] = [];
  token = localStorage.getItem('access_token');
  userroleDataByKey!: UserRoleMasterModel;
  selectedrowevent= new Subject<any>();
  refreshClickevent= new Subject<any>();
  headers = new HttpHeaders()
    .set('Authorization', "Bearer " + this.token)
    .set('Content-Type', 'application/json');;
  httpOptions = {
    headers: this.headers
  };
  
  constructor(private http: HttpClient,
    private router: Router) { }

  private appmenuMasterUrl = `${environment.apiUrl}/AppRoleMenu`;
  
  async getAppRoleMenu(appID:any,roleID:any) {
    const data = await this.http.get<AppMenuModel[]>(`${environment.apiUrl}/AppRoleMenu/GetMenuDetails/` + appID + '/' + roleID, this.httpOptions)
    .toPromise();
    return data;
  }

  async onRefreshUserRoleMaster(){
    const data = await this.http.get<UserRoleMasterModel[]>(`${environment.apiUrl}/UserRole/CreateUserRole`, this.httpOptions)
    .toPromise();
    this.userroleMasterDataCache = data;
    return data;
  }

  addRolePermission(RolName:string,SelectedMenus:string[]){
    return this.http.post<any>(`${environment.apiUrl}/AppRoleMenu/SaveAppMenu/` + RolName,
    SelectedMenus
        , this.httpOptions)
        .pipe(tap((res: any) => {
          return res;
        }));
  }

  editUserRoleMaster(userRoleMasterModel: UserRoleMasterModel){
    return this.http.put<any>(`${environment.apiUrl}/UserRole/` + userRoleMasterModel.id,
    userRoleMasterModel , this.httpOptions)
        .pipe(tap((res: any) => {
          return res;
        }));
  }
  getUserRoleMasterByKey(ID: number)  {
        return this.userroleMasterDataCache.find(item => item.id == ID);
  }

  AddOrEditRecordToCache(userRoleMasterModel: UserRoleMasterModel, editMode: boolean){
    if(editMode)
    {
      const objIndex = this.userroleMasterDataCache.findIndex(item => item.id == userRoleMasterModel.id);
      this.userroleMasterDataCache[objIndex] = userRoleMasterModel;
    }
    else
    {
      this.userroleMasterDataCache.push(userRoleMasterModel);
      this.userroleMasterDataCache.sort((a, b) => (a.roleName > b.roleName) ? 1 : -1);
    }
  }

  DeleteMaster(ID: number) {
    return this.http.delete<any>(`${environment.apiUrl}/UserRole/` + ID, this.httpOptions)
   .pipe(tap((res: any) => {
     return res;
   }));
  }

  DeleteFromCache(ID: number) {
    const objIndex = this.userroleMasterDataCache.findIndex(item => item.id == ID);
    this.userroleMasterDataCache.splice(objIndex,1);
    
  }
}
