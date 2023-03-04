import { Component, OnInit, ViewChild } from '@angular/core';
import { CancelEvent, CellClickEvent, CellCloseEvent, DataBindingDirective, GridComponent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportsService } from 'src/app/core/service/reports.service';
import { DemoPrintModel, prinrFilter, UpdateSalesOrderNoDTO, UpdateSerialnoStatus } from 'src/app/shared/model/DemoPrintModel';
import { Observable } from "rxjs/internal/Observable";
import Swal from "sweetalert2";
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';
import { AgGridAngular } from 'ag-grid-angular';
import { Keys } from '@progress/kendo-angular-common';

@Component({
  selector: 'org-ims-soentry',
  templateUrl: './soentry.component.html',
  styleUrls: ['./soentry.component.css']
})
export class SoentryComponent implements OnInit {
  submitted=false;
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
        SoNo: [null,Validators.required],
      });
    }

    ngOnInit(): void {
      this.gridView = [];
      this.allData = this.allData.bind(this);
    }
  
    get PrintedHistoryReportFormControls() { return this.PrintedHistoryReportForm.controls; }
  
    async LoadReport() {
      this.mySelection = []
      this.showActivebutton=false
      this.showInactivebutton=false
      this.gridView = [];
      this.printedHistory = [];
      var FilterReport: prinrFilter = new prinrFilter;
      FilterReport.fromDate = this.PrintedHistoryReportFormControls.FromDate.value;
      FilterReport.toDate = this.PrintedHistoryReportFormControls.ToDate.value;
      FilterReport.status=0;
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
      this.showActivebutton = this.selectedNodes.some((node: any) => node.statusText === 'Tag Printed')
    }
    UpdateSerialNoStatus(status: number) {
    this.submitted=true;
     if(this.PrintedHistoryReportForm.invalid)
     {
      return;
     }
     
      this.selectedSerialNos = this.mySelection.map((idx: any) => {
        return { serialNo: idx }
      });

      if (this.selectedSerialNos.length <= 0) {
        this.validationmessage = 'Please select atleast one row';
        return;
      }
      this.validationmessage = '';
      let data: UpdateSerialnoStatus = {
        lstSerialNo: this.selectedSerialNos,
        status: status,
        salesOrderNo:this.PrintedHistoryReportFormControls.SoNo.value
      }
      this.reportsService.AddSaleOrderNo(data).subscribe(result => {
        this.selectedSerialNos = []
        this.showActivebutton = false;
        this.mySelection = []
        this.LoadReport()
        this.submitted=false;
        this.saveAlert.showMessage('success', 'Updated Successfully!!!');
      },
        err => {
          this.submitted=false;
          Swal.fire('Error', err.error, 'error')
        }
      );

    }

    public cellClickHandler(args: CellClickEvent): void {
      if (!args.isEdited) {
        if (args.columnIndex == 5) {
          args.sender.editCell(
            args.rowIndex,
            args.columnIndex,
            this.createFormGroup(args.dataItem)
          );
        }
      }
    }
  
    public cancelHandler(args: CancelEvent): void {
      args.sender.closeRow(args.rowIndex);
    }
    
    public cellCloseHandler(args: CellCloseEvent): void {
      const { formGroup, dataItem } = args;
      if (!formGroup.valid) {
        // prevent closing the edited cell if there are invalid values.
        args.preventDefault();
      } else if (formGroup.dirty) {
        if (args.originalEvent && args.originalEvent.keyCode === Keys.Escape) {
          return;
        }
       

        let oldVal = this.gridView[args.rowIndex]?.sO_NUMBER;
        let newVal: string = formGroup.value.sO_NUMBER ?? '';
        if (!newVal || newVal.trim().length == 0 || newVal == oldVal) {
          return;
        }
  
        this.printedHistory[args.rowIndex].sO_NUMBER = newVal;
  
  
        Swal.fire({
          title: 'Are you sure you want to change sales order number?',
          text: 'You will not be able to undo this action!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
  
  
            let data = new UpdateSalesOrderNoDTO();
            data.SalesOrderNo = newVal;
            data.SerialNo = formGroup.value.serialNo;
  
            this.reportsService.UpdateSalesOrderNo(data).subscribe(
              result => {                
                this.saveAlert.showMessage('success', 'Updated Successfully!!!');              
              },
              err => {     
                this.printedHistory[args.rowIndex].sO_NUMBER = oldVal;         
                Swal.fire('Error', (err?.error)??'An error occured while saving details', 'error')
              }
            );
          }
          else{
            this.printedHistory[args.rowIndex].sO_NUMBER = oldVal;    
          }
        })
  
  
  
  
  
      }
    }
  
    public createFormGroup(dataItem: any): FormGroup {
      return this.formBuilder.group({
        serialNo: dataItem.serialNo,
        createD_DATE: dataItem.createD_DATE,
        createD_BY: dataItem.createD_BY,
        transactioN_ID: dataItem.transactioN_ID,
        sO_NUMBER: dataItem.sO_NUMBER,
        orgCode: dataItem.orgCode,
        orgName: dataItem.orgName,
        locationCode: dataItem.locationCode,
        locationName: dataItem.locationName,
        itemCode: dataItem.itemCode,
        itemName: dataItem.itemName,
        loT_NUMBER: dataItem.loT_NUMBER,
        supplieR_LOT_NUMBER: dataItem.supplieR_LOT_NUMBER,
        expiratioN_DATE: dataItem.expiratioN_DATE,
      });
    }
}
