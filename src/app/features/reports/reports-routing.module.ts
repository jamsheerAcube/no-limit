import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportNumbers } from 'src/app/shared/Reports/ReportNumbers';
import { AuthGuard } from '../../_helpers';
import { AuditscanneddetailComponent } from './auditscanneddetail/auditscanneddetail.component';
import { AuditscannedsummaryComponent } from './auditscannedsummary/auditscannedsummary.component';
import { AuditvsinventorysummaryComponent } from './auditvsinventorysummary/auditvsinventorysummary.component';
import { PrintedhistoryComponent } from './printedhistory/printedhistory.component';
import { ReportsComponent } from './reports.component';
import { ReportsfilterformComponent } from './reportsfilterform/reportsfilterform.component';

const routes: Routes = [{ path: '', component: ReportsComponent },
{ path: 'auditscanneddetails', component: AuditscanneddetailComponent, canActivate: [AuthGuard] },
{ path: 'auditscannedsummary', component: AuditscannedsummaryComponent, canActivate: [AuthGuard] },
{ path: 'auditinventorysummary', component: AuditvsinventorysummaryComponent, canActivate: [AuthGuard] },
{ path: 'printedhistory', component: PrintedhistoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
