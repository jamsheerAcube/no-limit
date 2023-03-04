import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SideMenuItems } from '../../shared/model/SideMenuItems';

@Injectable({ providedIn: 'root' })
export class SidebarnavService {  
  constructor(private http: HttpClient) { }
  getSideNavItems() {
    let roleName = localStorage.getItem('roleName');
    let appID = localStorage.getItem('appID');
    return this.http.get<SideMenuItems[]>(`${environment.apiUrl}/AppRoleMenu/` + appID + '/' + roleName);
  }
}
