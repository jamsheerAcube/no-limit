import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../../shared/shared.module';
import { CommonvaluelistformComponent } from './commonvaluelist/commonvaluelistform/commonvaluelistform.component';
import { CommonvaluelistgridComponent } from './commonvaluelist/commonvaluelistgrid/commonvaluelistgrid.component';
import { CompanyComponent } from './company/company.component';
import { DepartmentmasterformComponent } from './departmentmaster/departmentmasterform/departmentmasterform.component';
import { DepartmentmastergridComponent } from './departmentmaster/departmentmastergrid/departmentmastergrid.component';
import { EmployeemasterformComponent } from './employeemaster/employeemasterform/employeemasterform.component';
import { EmployeemastergridComponent } from './employeemaster/employeemastergrid/employeemastergrid.component';
import { LocationmasterformComponent } from './locationmaster/locationmasterform/locationmasterform/locationmasterform.component';
import { LocationmastergridComponent } from './locationmaster/locationmastergrid/locationmastergrid.component';
import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { ProductmasterformComponent } from './productmaster/productmasterform/productmasterform.component';
import { ProductmastergridComponent } from './productmaster/productmastergrid/productmastergrid.component';
import { UsermasterformComponent } from './usermaster/usermasterform/usermasterform.component';
import { UsermastergridComponent } from './usermaster/usermastergrid/usermastergrid.component';
import { UserrolemastergridComponent } from './userrolemaster/userrolemastergrid/userrolemastergrid.component';
import { UserrolemasterformComponent } from './userrolemaster/userrolemasterform/userrolemasterform.component';
import { TreeviewModule } from 'ngx-treeview';
import { UserrolepermissionformComponent } from './userrolepermission/userrolepermissionform/userrolepermissionform.component';
import { OrgmasterformComponent } from './orgmaster/orgmasterform/orgmasterform.component';
import { OrgmastergridComponent } from './orgmaster/orgmastergrid/orgmastergrid.component';

@NgModule({
  declarations: [MasterComponent,  CompanyComponent, LocationmasterformComponent,  LocationmastergridComponent, 
    DepartmentmasterformComponent, DepartmentmastergridComponent, 
    EmployeemasterformComponent, EmployeemastergridComponent, 
    CommonvaluelistgridComponent, CommonvaluelistformComponent, 
    ProductmasterformComponent, ProductmastergridComponent, 
    UsermasterformComponent, UsermastergridComponent,UserrolemastergridComponent,
    UserrolemasterformComponent,UserrolepermissionformComponent,OrgmasterformComponent,OrgmastergridComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers:[]
})
export class MasterModule { }
