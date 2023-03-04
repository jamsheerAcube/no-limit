import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ReportsModule } from './features/reports/reports.module';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    DashboardModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    ReportsModule,
    GridModule,
    PDFModule,
    ExcelModule,
    BrowserAnimationsModule
  ],
  exports: [NgxChartsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
