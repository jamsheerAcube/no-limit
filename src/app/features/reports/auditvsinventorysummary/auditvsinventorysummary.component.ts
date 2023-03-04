import { Component, OnInit, ViewChild } from '@angular/core';
declare var $: any;
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReportsService } from 'src/app/core/service/reports.service';
import { DataBindingDirective, GridComponent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { AuditReportFilter } from 'src/app/shared/model/auditreport';
import { AssetAuditModel, AuditFilter } from 'src/app/shared/model/AssetAuditModel';

@Component({
  selector: 'org-ims-auditvsinventorysummary',
  templateUrl: './auditvsinventorysummary.component.html',
  styleUrls: ['./auditvsinventorysummary.component.css']
})
export class AuditvsinventorysummaryComponent implements OnInit {
  public opened = false;
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
  public gridView: any[]=[];
  public gridViewdetails:any[]=[];
  fileName = 'AssetHistoryReportSummary.xlsx';
  AuditInventorySummaryReportForm: FormGroup;
  assetAuditReportSummary: AssetAuditModel[] = [];
  assetAuditReportDetails: AssetAuditModel[] = [];
  showReport=false;
  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    public reportsService: ReportsService) { 
      this.AuditInventorySummaryReportForm = this.formBuilder.group({
        FromDate: [null],
        ToDate:[null]
      });
    }

  ngOnInit(): void {
    this.gridView=[];
  }

  get AuditInventorySummaryReportFormControls() { return this.AuditInventorySummaryReportForm.controls; }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.gridView, {
        filter: this.filter,
        sort: [],
      }).data
    };

    return result;
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridView = filterBy(this.assetAuditReportSummary, filter);
  }

  filterChangedetails(filter: CompositeFilterDescriptor): void 
  {
    this.filter = filter;
    this.gridViewdetails = filterBy(this.assetAuditReportDetails, filter);
  }

  async onSearchClick()
  {
    this.gridView=[];
    this.assetAuditReportSummary=[];
    
      var _FilterReport:AuditFilter=new AuditFilter;
      _FilterReport.fromDate=this.AuditInventorySummaryReportFormControls.FromDate.value
      _FilterReport.toDate=this.AuditInventorySummaryReportFormControls.ToDate.value
      this.assetAuditReportSummary = await this.reportsService.getAuditHeaderReport(_FilterReport);
      this.directive.skip=0; 
      this.gridView=this.assetAuditReportSummary;
  }

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


  public close(): void {
    this.opened = false;
  }

  public open(): void {
    this.opened = true;
  }

  serialNo='';
 async ShowItemDetail(x1:any)
  {
    this.opened=true;
    var _FilterReport:AuditFilter=new AuditFilter;
    _FilterReport.AuditId=x1.auditId;
    this.assetAuditReportDetails = await this.reportsService.getAuditInventoryReport(_FilterReport);
    this.gridViewdetails=this.assetAuditReportDetails;
  }

}
