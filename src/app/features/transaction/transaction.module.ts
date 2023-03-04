import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeviewModule } from 'ngx-treeview';
import { ModalModule } from '../../core/_modal';
import { SharedModule } from '../../shared/shared.module';
import { MasterRoutingModule } from '../master/master-routing.module';
import { AssetauditformComponent } from './assetaudit/assetauditform/assetauditform.component';
import { AssetauditgridComponent } from './assetaudit/assetauditgrid/assetauditgrid.component';
import { AssetdepreciationformComponent } from './assetdepreciation/assetdepreciationform/assetdepreciationform.component';
import { AssetverificationformComponent } from './assetverification/assetverificationform/assetverificationform.component';
import { AssetverificationgridComponent } from './assetverification/assetverificationgrid/assetverificationgrid.component';
import { AuditdiscrepancyformComponent } from './auditdiscrepancy/auditdiscrepancyform/auditdiscrepancyform.component';
import { AuditverifyformComponent } from './auditverify/auditverifyform/auditverifyform.component';
import { AuditverifygridComponent } from './auditverify/auditverifygrid/auditverifygrid.component';
import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { AssetsummaryComponent } from './assetaudit/assetsummary/assetsummary.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DemoprintComponent } from './demoprint/demoprint.component';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { TageditComponent } from './tagedit/tagedit.component';
import { SoentryComponent } from './soentry/soentry.component';
import { TagreprintComponent } from './tagreprint/tagreprint.component';


@NgModule({
  declarations: [TransactionComponent,  AssetverificationformComponent, AssetverificationgridComponent, AssetdepreciationformComponent,  AssetauditformComponent, AssetauditgridComponent, AuditverifyformComponent, AuditverifygridComponent, AuditdiscrepancyformComponent, AssetsummaryComponent, DemoprintComponent, TageditComponent, SoentryComponent,TagreprintComponent],
  imports: [
    SharedModule,
    TransactionRoutingModule,
    SharedModule,
    BrowserModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,    
    ModalModule,
    GridModule,
    PDFModule,
    ExcelModule,
    AgGridModule.withComponents([]),
    TreeviewModule.forRoot(),
    NgSelectModule
  ],
  exports: [
    
  ],
  providers: [DatePipe]
})
export class TransactionModule { }
