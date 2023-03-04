import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponseData } from '../../shared/interface/authresponsedata';
import { User } from '../../shared/model/user';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  refreshTokenTimeout: any = null;
  loginStatus: Subject<boolean> = new Subject<boolean>();
  lastLoginStatus: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    console.log('AuthenticationService initialized');
    this.refreshToken();
  }

  login(userDetails: User) {
   // console.warn(userDetails);
    return this.http.post<AuthResponseData>(`${environment.apiUrl}/user/authenticate`,
      {
        "companyID": userDetails.companyCode,
        "applicationID": "FATWEBUI",
        "userName": userDetails.userName,
        "password": userDetails.password
      })
      .pipe(tap((res: AuthResponseData) => {
      //  console.log(res);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('roleName', res.roleName);
        localStorage.setItem('userName', res.userName);
        localStorage.setItem('appID', 'FATWEBUI');
        localStorage.setItem('prefix', res.prefix);
        localStorage.setItem('suffix', res.suffix);
        localStorage.setItem('companyID', res.companyID);
        this.setLoginStatus(true);
        this.startRefreshTokenTimer();
        return res;
      }))
  }

  resetLogin(){
    this.stopRefreshTokenTimer();
    this.setLoginStatus(false);    
    localStorage.clear();
  }

  logout() {
    this.resetLogin();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const jwtToken = JSON.parse(atob(tokenString.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      if ((expires.getTime() - Date.now()) > 0) {
        this.setLoginStatus(true);
        return true;
      }
    }
    this.setLoginStatus(false);
    return false;
  }

  getAuthToken(): string {
    const token = localStorage.getItem('access_token');
    return (token) ? token : "";
  }

  refreshToken() {
    if (this.isLoggedIn()) {
      this.http.get<any>(`${environment.apiUrl}/user/renewtoken`)
        .subscribe(res => {
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('roleName', res.roleName);
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('appID', 'FATWEBUI');
          this.setLoginStatus(true);
          this.startRefreshTokenTimer();
        }, error => {
          console.log(`Token renewal failed:`, error);
          this.setLoginStatus(false);
        });
    }
  }

  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.getAuthToken().split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  setLoginStatus(newValue: boolean) {
    if (this.lastLoginStatus != newValue) {
      this.lastLoginStatus = newValue;
      this.loginStatus.next(this.lastLoginStatus);
      if (this.lastLoginStatus == false) {
        this.logout();
      }
    }
  }
}
