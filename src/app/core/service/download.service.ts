import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class DownloadService {
  token = localStorage.getItem('access_token');
  headers = new HttpHeaders()
    .set('Authorization', "Bearer " + this.token);
    fileheaders = new HttpHeaders()
    .set('Authorization', "Bearer " + this.token)
    .set('responseType', 'text');
  httpOptions = {
    responseType: 'blob' as 'json',
    headers: this.headers
  };
  filehttpOptions = {
    headers: this.fileheaders
  };

  constructor(private http: HttpClient) { }

  DownloadFile(documentId: string) {
    return this.http.get(`${environment.apiUrl}/Files/` + documentId, this.httpOptions);
  }

  DownloadTemplateFile() {
    return this.http.get( `${environment.apiUrl}/Files/GetReceiptTemplate`, this.httpOptions);
   }

  
   UploadMacroFile(formData: FormData){
    return this.http.post<any>(`${environment.apiUrl}/Files/MacroFileUpload`,
    formData
        , this.filehttpOptions)
        .pipe(tap((res: any) => {
          return res;
        }));
  }

   
}