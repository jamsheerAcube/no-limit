import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductMasterModel } from '../../shared/model//ProductMasterModel';

@Injectable({
    providedIn: 'root'
})
export class ProductMasterService {
    productmasterDataCache: ProductMasterModel[] = [];
    token = localStorage.getItem('access_token');
    productMasterDataByKey!: ProductMasterModel;
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

    private productMasterUrl = `${environment.apiUrl}/Product`;

    async getProductMaster(forceRefresh: boolean = false) {
        if (!(this.productmasterDataCache.length > 0)) {
            const data = await this.http.get<ProductMasterModel[]>(this.productMasterUrl + "/GetAllProducts", this.httpOptions)
                .toPromise();
            this.productmasterDataCache = data;
            return data;
        }
        else {
            return this.productmasterDataCache;
        }
    }

    async onRefreshProductmaster() {
        const data = await this.http.get<ProductMasterModel[]>(this.productMasterUrl + "/GetAllProducts", this.httpOptions)
            .toPromise();
        this.productmasterDataCache = data;
        return data;
    }

    addProductmaster(productmastermodel: ProductMasterModel) {
        return this.http.post<any>(`${environment.apiUrl}/Product`,
            productmastermodel
            , this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    editProductmaster(productmastermodel: ProductMasterModel) {
        return this.http.put<any>(`${environment.apiUrl}/Product/` + productmastermodel.itemID,
            productmastermodel, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }
    getProductMasterByKey(productID: number) {
        return this.productmasterDataCache.find(item => item.itemID == productID);
    }

    AddOrEditRecordToCache(productmastermodel: ProductMasterModel, editMode: boolean) {
        if (editMode) {
            const objIndex = this.productmasterDataCache.findIndex(item => item.itemID == productmastermodel.itemID);
            this.productmasterDataCache[objIndex] = productmastermodel;
        }
        else {
            this.productmasterDataCache.push(productmastermodel);
            this.productmasterDataCache.sort((a, b) => (a.itemCode > b.itemCode) ? 1 : -1);
        }
    }

    DeleteProductMaster(productID: number) {
        return this.http.delete<any>(`${environment.apiUrl}/Product/` + productID, this.httpOptions)
            .pipe(tap((res: any) => {
                return res;
            }));
    }

    DeleteFromCache(productID: number) {
        const objIndex = this.productmasterDataCache.findIndex(item => item.itemID == productID);
        this.productmasterDataCache.splice(objIndex, 1);

    }
    async getProductMasterbyLocationwise(locationId: number) {
        const data = await this.http.get<ProductMasterModel[]>(this.productMasterUrl + "/GetLocationStock/"+locationId, this.httpOptions)
            .toPromise();
        this.productmasterDataCache = data;
        return data;

    }
    
}