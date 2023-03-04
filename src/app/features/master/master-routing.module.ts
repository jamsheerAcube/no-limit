import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers/auth.guard';
import { CommonvaluelistformComponent } from './commonvaluelist/commonvaluelistform/commonvaluelistform.component';
import { CommonvaluelistgridComponent } from './commonvaluelist/commonvaluelistgrid/commonvaluelistgrid.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentmasterformComponent } from './departmentmaster/departmentmasterform/departmentmasterform.component';
import { DepartmentmastergridComponent } from './departmentmaster/departmentmastergrid/departmentmastergrid.component';
import { EmployeemasterformComponent } from './employeemaster/employeemasterform/employeemasterform.component';
import { EmployeemastergridComponent } from './employeemaster/employeemastergrid/employeemastergrid.component';
import { LocationmasterformComponent } from './locationmaster/locationmasterform/locationmasterform/locationmasterform.component';
import { LocationmastergridComponent } from './locationmaster/locationmastergrid/locationmastergrid.component';
import { MasterComponent } from './master.component';
import { OrgmastergridComponent } from './orgmaster/orgmastergrid/orgmastergrid.component';
import { ProductmasterformComponent } from './productmaster/productmasterform/productmasterform.component';
import { ProductmastergridComponent } from './productmaster/productmastergrid/productmastergrid.component';
import { UsermasterformComponent } from './usermaster/usermasterform/usermasterform.component';
import { UsermastergridComponent } from './usermaster/usermastergrid/usermastergrid.component';
import { UserrolemasterformComponent } from './userrolemaster/userrolemasterform/userrolemasterform.component';
import { UserrolemastergridComponent } from './userrolemaster/userrolemastergrid/userrolemastergrid.component';
import { UserrolepermissionformComponent } from './userrolepermission/userrolepermissionform/userrolepermissionform.component';

const routes: Routes = [{ path: 'company', component: CompanyComponent },
{ path: '', component: MasterComponent },
{ path: 'orgmaster', component: OrgmastergridComponent, canActivate: [AuthGuard]},
{ path: 'locationmaster', component: LocationmastergridComponent, canActivate: [AuthGuard]},
{ path: 'departmentmaster', component: DepartmentmastergridComponent, canActivate: [AuthGuard]},
{ path: 'locationmaster/add', component: LocationmasterformComponent, canActivate: [AuthGuard]},
{ path: 'locationmaster/:state/:id', component: LocationmasterformComponent, canActivate: [AuthGuard]},
{ path: 'departmentmaster/add', component: DepartmentmasterformComponent, canActivate: [AuthGuard]},
{ path: 'departmentmaster/:state/:id', component: DepartmentmasterformComponent, canActivate: [AuthGuard]},
{ path: 'employeemaster', component: EmployeemastergridComponent, canActivate: [AuthGuard]},
{ path: 'employeemaster/add', component: EmployeemasterformComponent, canActivate: [AuthGuard]},
{ path: 'employeemaster/:state/:id', component: EmployeemasterformComponent, canActivate: [AuthGuard]},
{ path: 'valuelist', component: CommonvaluelistgridComponent, canActivate: [AuthGuard]},
{ path: 'valuelist/add', component: CommonvaluelistformComponent, canActivate: [AuthGuard]},
{ path: 'valuelist/:state/:id', component: CommonvaluelistformComponent, canActivate: [AuthGuard]},
{ path: 'productmaster', component: ProductmastergridComponent, canActivate: [AuthGuard]},
{ path: 'productmaster/add', component: ProductmasterformComponent, canActivate: [AuthGuard]},
{ path: 'productmaster/:state/:id', component: ProductmasterformComponent, canActivate: [AuthGuard]},
{ path: 'usermaster', component: UsermastergridComponent, canActivate: [AuthGuard]},
{ path: 'usermaster/add', component: UsermasterformComponent, canActivate: [AuthGuard]},
{ path: 'usermaster/:state/:id', component: UsermasterformComponent, canActivate: [AuthGuard]},
{ path: 'rolepermission', component: UserrolepermissionformComponent, canActivate: [AuthGuard]},
{ path: 'userrolemaster', component: UserrolemastergridComponent, canActivate: [AuthGuard]},
{ path: 'userrolemaster/add', component: UserrolemasterformComponent, canActivate: [AuthGuard]},
{ path: 'userrolemaster/:state/:id', component: UserrolemasterformComponent, canActivate: [AuthGuard]}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
