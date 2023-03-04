import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective, GridComponent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportsService } from 'src/app/core/service/reports.service';
import { DemoPrintModel, prinrFilter } from 'src/app/shared/model/DemoPrintModel';

@Component({
  selector: 'org-ims-printedhistory',
  templateUrl: './printedhistory.component.html',
  styleUrls: ['./printedhistory.component.css']
})
export class PrintedhistoryComponent implements OnInit {
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
  PrintedHistoryReportForm: FormGroup;
  showReport=false;
  printedHistory: DemoPrintModel[] = [];
  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    public reportsService: ReportsService) { 
      this.PrintedHistoryReportForm = this.formBuilder.group({
        FromDate: [null],
        ToDate: [null],
      });

    }

  ngOnInit(): void {
    this.gridView=[];
    this.allData = this.allData.bind(this);
    this.setSelectableSettings();
  }
  get PrintedHistoryReportFormControls() { return this.PrintedHistoryReportForm.controls; }

  async LoadReport()
  {
      this.gridView=[];
      this.printedHistory=[];
        var FilterReport:prinrFilter=new prinrFilter;
        FilterReport.fromDate=this.PrintedHistoryReportFormControls.FromDate.value;
        FilterReport.toDate=this.PrintedHistoryReportFormControls.ToDate.value;
        this.printedHistory = await this.reportsService.getPrintedHistory(FilterReport);
        this.directive.skip=0; 
        this.gridView=this.printedHistory;
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
    this.gridView = filterBy(this.printedHistory, filter);
  }



}
