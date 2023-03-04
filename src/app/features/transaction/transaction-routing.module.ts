import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { AssetauditformComponent } from './assetaudit/assetauditform/assetauditform.component';
import { AssetauditgridComponent } from './assetaudit/assetauditgrid/assetauditgrid.component';
import { AssetsummaryComponent } from './assetaudit/assetsummary/assetsummary.component';
import { AssetverificationformComponent } from './assetverification/assetverificationform/assetverificationform.component';
import { AuditdiscrepancyformComponent } from './auditdiscrepancy/auditdiscrepancyform/auditdiscrepancyform.component';
import { AuditverifyformComponent } from './auditverify/auditverifyform/auditverifyform.component';
import { DemoprintComponent } from './demoprint/demoprint.component';
import { TransactionComponent } from './transaction.component';
import { TageditComponent } from './tagedit/tagedit.component';
import { SoentryComponent } from './soentry/soentry.component';
import { TagreprintComponent } from './tagreprint/tagreprint.component';
const routes: Routes = [{ path: '', component: TransactionComponent },
{ path: 'assetverification', component: AssetverificationformComponent, canActivate: [AuthGuard] },
{ path: 'assetverification/add', component: AssetverificationformComponent, canActivate: [AuthGuard] },
{ path: 'assetverification/:state/:id', component: AssetverificationformComponent, canActivate: [AuthGuard] },
{ path: 'physicalcount', component: AssetauditgridComponent, canActivate: [AuthGuard] },
{ path: 'physicalcount/add', component: AssetauditformComponent, canActivate: [AuthGuard] },
{ path: 'physicalcount/assetsummary/:id', component: AssetsummaryComponent, canActivate: [AuthGuard] },
{ path: 'physicalcount/auditvariance/:id', component: AssetsummaryComponent, canActivate: [AuthGuard] },
{ path: 'physicalcount/:state/:id', component: AssetauditformComponent, canActivate: [AuthGuard] },
{ path: 'auditverify', component: AuditverifyformComponent, canActivate: [AuthGuard] },
{ path: 'auditdiscrepancy', component: AuditdiscrepancyformComponent, canActivate: [AuthGuard] },
{ path: 'printtag', component: DemoprintComponent, canActivate: [AuthGuard] },
{ path: 'reprinttag', component: TagreprintComponent, canActivate: [AuthGuard] },
{ path: 'tagedit', component: TageditComponent, canActivate: [AuthGuard] },
{ path: 'soentry', component: SoentryComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
