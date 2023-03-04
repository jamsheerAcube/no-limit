import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';

@NgModule({
  declarations: [
    MaindashboardComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxChartsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    GridModule,
    PDFModule,
    ExcelModule,
     
  ],
  providers:[]
})
export class DashboardModule { }
