import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { TreeviewModule } from 'ngx-treeview';
import { ModalModule } from '../../core/_modal';
import { SharedModule } from '../../shared/shared.module';
import { MasterRoutingModule } from '../master/master-routing.module';
import { TransactionRoutingModule } from '../transaction/transaction-routing.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportsfilterformComponent } from './reportsfilterform/reportsfilterform.component';
import { AuditscannedsummaryComponent } from './auditscannedsummary/auditscannedsummary.component';
import { AuditscanneddetailComponent } from './auditscanneddetail/auditscanneddetail.component';
import { AuditvsinventorysummaryComponent } from './auditvsinventorysummary/auditvsinventorysummary.component';
import { PrintedhistoryComponent } from './printedhistory/printedhistory.component';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { WindowModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [ReportsComponent, ReportsfilterformComponent, AuditscannedsummaryComponent, AuditscanneddetailComponent, AuditvsinventorysummaryComponent, PrintedhistoryComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    TransactionRoutingModule,
    SharedModule,
    FormsModule,
    MasterRoutingModule,
    ReactiveFormsModule,
    FileUploadModule,    
    ModalModule,
    AgGridModule.withComponents([]),
    TreeviewModule.forRoot(),
    GridModule,
    PDFModule,
    ExcelModule,
    WindowModule
  ],
  exports: [
  ],
  providers: [DatePipe]
})
export class ReportsModule { }
