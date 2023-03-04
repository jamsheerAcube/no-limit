import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/core/dashboard';
import { AuthGuard } from 'src/app/_helpers';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{ path: 'dashboardlink', component: MaindashboardComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
