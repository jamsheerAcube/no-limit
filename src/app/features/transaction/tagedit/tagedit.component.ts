import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBindingDirective, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportsService } from 'src/app/core/service/reports.service';
import { DemoPrintModel, prinrFilter, UpdateSerialnoStatus } from 'src/app/shared/model/DemoPrintModel';
import Swal from "sweetalert2";
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';

@Component({
  selector: 'org-ims-tagedit',
  templateUrl: './tagedit.component.html',
  styleUrls: ['./tagedit.component.css']
})
export class TageditComponent implements OnInit {
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
  public mode: any = "single";
  public drag = false;
  public gridView: any[] = [];
  public gridViewdetails: any[] = [];
  fileName = 'AssetHistoryReportSummary.xlsx';
  PrintedHistoryReportForm: FormGroup;
  showReport = false;
  printedHistory: DemoPrintModel[] = [];
  selectedSerialNos: any[] = [];
  selectedNodes: DemoPrintModel[] = [];
  public selectableSettings: SelectableSettings = {
    checkboxOnly: true,
    mode: 'multiple',
  };
  showActivebutton: boolean = false;
  showInactivebutton: boolean = false;
  validationmessage!: string;
  mySelection: any[] = [];
  constructor(private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private router: Router,
    private saveAlert: SaveAlert,
    public reportsService: ReportsService) {
    this.PrintedHistoryReportForm = this.formBuilder.group({
      FromDate: [null],
      ToDate: [null],
      SoNo: [null]
    });
  }

  ngOnInit(): void {
    this.gridView = [];
    this.allData = this.allData.bind(this);
  }

  get PrintedHistoryReportFormControls() { return this.PrintedHistoryReportForm.controls; }

  async LoadReport() {
    this.mySelection = []
    this.showActivebutton = false
    this.showInactivebutton = false
    this.gridView = [];
    this.printedHistory = [];
    var FilterReport: prinrFilter = new prinrFilter;
    FilterReport.fromDate = this.PrintedHistoryReportFormControls.FromDate.value;
    FilterReport.toDate = this.PrintedHistoryReportFormControls.ToDate.value;
    FilterReport.SoNo = this.PrintedHistoryReportFormControls.SoNo.value;
    this.printedHistory = await this.reportsService.getPrintedHistory(FilterReport);
    this.directive.skip = 0;
    this.gridView = this.printedHistory;
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
  OnSelectCheckbox(selectedrows: any) {
    this.selectedNodes = selectedrows.map((idx: any) => {
      return this.gridView.find(item => item.serialNo === idx);
    });
    this.showInactivebutton = this.selectedNodes.some((node: any) => node.statusText === 'Tag Printed')
    this.showActivebutton = this.selectedNodes.some((node: any) => node.statusText === 'Tag InActivated')
  }
  UpdateSerialNoStatus(status: number) {
    if (status == 0 && this.showInactivebutton && this.showActivebutton) {
      this.validationmessage = 'please unselect the active serialno. to proceed'
      return
    }
    if (status == 1 && this.showInactivebutton && this.showActivebutton) {
      this.validationmessage = 'please unselect the inactive serialno. to proceed'
      return
    }
    this.validationmessage = '';
    let title = status == 0 ? 'Are you sure you want to Activate?' : 'Are you sure you want to Inactivate?'
    Swal.fire({
      title: title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.selectedSerialNos = this.mySelection.map((idx: any) => {
          return { serialNo: idx }
        });
        let data: UpdateSerialnoStatus = {
          lstSerialNo: this.selectedSerialNos,
          status: status,
          salesOrderNo: ''
        }
        this.reportsService.UpdateSerialNoStatus(data).subscribe(result => {
          this.selectedSerialNos = []
          this.showInactivebutton = false;
          this.showActivebutton = false;
          this.mySelection = []
          this.LoadReport()
          this.saveAlert.showMessage('success', 'Updated Successfully!!!');
        },
          err => {
            Swal.fire('Error', err.error, 'error')
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'
        )
      }
    })
  }



}