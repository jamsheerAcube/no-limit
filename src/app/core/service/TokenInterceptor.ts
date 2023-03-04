import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiUrl)
      && this.isLoggedIn()) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${this.getAuthToken()}` }
      });
    }
    return next.handle(req);
  }

  isLoggedIn(): boolean {
    const tokenString  = localStorage.getItem('access_token');
    if(tokenString){
      const jwtToken = JSON.parse(atob(tokenString.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      if ((expires.getTime() - Date.now()) > 0) {
        return true;
      }
    }
    return false;
  }

  getAuthToken(): string {
    const token = localStorage.getItem('access_token');
    return (token) ? token : "";
  }
}