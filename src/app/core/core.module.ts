import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardModule } from '../features/dashboard/dashboard.module';
import { TransactionModule } from '../features/transaction/transaction.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { JsonDateInterceptor } from './service/JsonDateInterceptor';
import { TokenInterceptor } from './service/TokenInterceptor';
import { SidebarnavComponent } from './sidebarnav/sidebarnav.component';
import { ModalModule } from './_modal';

@NgModule({
  declarations: [SidebarnavComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    TransactionModule,
    DashboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JsonDateInterceptor, multi:true },
  ],
  exports: [SidebarnavComponent]
})
export class CoreModule { }
