import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PrintLabelModel } from '../../shared/model//PrintLabelModel';

@Injectable({
    providedIn: 'root'
})
export class PrintLabelService {
    labelDesignDataCache: string[] = [];
    token = localStorage.getItem('access_token');
    
    headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.token)
        .set('Content-Type', 'application/json');
    httpOptions = {
        headers: this.headers
    };

    constructor(private http: HttpClient,
        private router: Router) { }

    private printLabelMasterUrl = `${environment.apiUrl}/Print/LabelDesigns`;

    async getPrintLabelDesign() {
        if (!(this.labelDesignDataCache.length > 0)) {
            const data = await this.http.get<string[]>(this.printLabelMasterUrl, this.httpOptions)
                .toPromise();
            this.labelDesignDataCache = data;
            return data;
        }
        else {
            return this.labelDesignDataCache;
        }
    }

    async getPrintLabelDesignData(fileName:string) {
        const data = await this.http.get<string>(`${environment.apiUrl}/Print/GetLabelDesignData/` + fileName, this.httpOptions)
        .toPromise();
    return data;
    }

    getPrintLabel(printLabelmastermodel: PrintLabelModel) {
        return this.http.post<any>(`${environment.apiUrl}/PrintLabels/SerialNumberDesign`,
            printLabelmastermodel
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    updatePrintStatus(serialNo: string[]) {
        return this.http.post<any>(`${environment.apiUrl}/Asset/UpdatePrintedStatus`,
        serialNo
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    
}