import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonValueListService } from 'src/app/core/service/commonlistvalue.service';
import { DashboardService } from 'src/app/core/service/dashboard.service';
import { CommonValueListModel } from 'src/app/shared/model/CommonValueListModel';
import { ValueListNames } from 'src/app/shared/model/ValueListNames';
import { DataBindingDirective, GridComponent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssetAuditModel } from 'src/app/shared/model/AssetAuditModel';
import { DemoPrintModel } from 'src/app/shared/model/DemoPrintModel';
declare var $: any;

@Component({
  selector: 'org-ims-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {

  valueListModel:CommonValueListModel[]=[];
  @ViewChild(DataBindingDirective) directive: any;
  public filter!: CompositeFilterDescriptor;
  public state: any = {
    skip: 0,
    take: 10,
    filter: {
      logic: 'and',
      filters: []
    }
  }
  public windowTop = 250;
  public windowLeft = 50;
  public checkboxOnly = false;
public mode:any= "single";
public drag = false;
public selectableSettings!: SelectableSettings;
  public gridAuditView: any[]=[];
  public gridExpiryView:any[]=[];
  DashboardForm: FormGroup;
  auditSummaryList:AssetAuditModel[]=[];
  expiryItems:DemoPrintModel[]=[];
  constructor(private formBuilder: FormBuilder,private dashboardservice:DashboardService,private valuelistservice:CommonValueListService) { 
    this.DashboardForm = this.formBuilder.group({
      ValueSelCode: [null]
    });
  }

  async ngOnInit() {
    this.valueListModel=await this.valuelistservice.getCommonValueListMaster();
    this.valueListModel=this.valueListModel.filter(p=>p.listName.includes("Expiry"));
    this.gridAuditView=[];
    this.gridExpiryView=[];
    
      this.auditSummaryList = await this.dashboardservice.getLast10Audits();
      this.directive.skip=0; 
      this.gridAuditView=this.auditSummaryList;
      $('[name="ValueSelCode"]').val(0);
     await this.onValueListChange("0");
  }

  async onValueListChange(selValue:any)
  {
    this.gridExpiryView=[];
    if(selValue!=null && selValue!="")
    {
    this.expiryItems = await this.dashboardservice.getExpiringItems(selValue);
    this.gridExpiryView=this.expiryItems;
    }
  }

  get DashboardFormControls() { return this.DashboardForm.controls; }

  public setSelectableSettings(): void {
    if (this.checkboxOnly || this.mode === "single") {
      this.drag = false;
    }

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: this.mode,
      drag: this.drag,
    };
  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.gridAuditView, {
        filter: this.filter,
        sort: [],
      }).data
    };

    return result;
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridAuditView = filterBy(this.auditSummaryList, filter);
  }

  filterChangedetails(filter: CompositeFilterDescriptor): void 
  {
    this.filter = filter;
    this.gridExpiryView = filterBy(this.expiryItems, filter);
  }


}
