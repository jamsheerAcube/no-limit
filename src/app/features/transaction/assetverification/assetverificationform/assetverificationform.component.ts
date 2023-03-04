import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AssetVerificationService } from '../../../../core/service/assetverification.service';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { AssetVerificationModel } from '../../../../shared/model/AssetVerificationModel';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'org-fat-assetverificationform',
  templateUrl: './assetverificationform.component.html',
  styleUrls: ['./assetverificationform.component.scss']
})
export class AssetverificationformComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  assetVerificationForm: FormGroup;
  submitted = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  receiptId!: string;
  error = '';
  errorReceipt = '';
  editMode: boolean = false;
  assetverificationmodel: AssetVerificationModel = new AssetVerificationModel;
  columnReceiptDefs: any;
  gridApi: any;
  gridColumnApi: any;
  rowReceiptData!:any[];

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private assetVerificationService: AssetVerificationService,
    private saveAlert: SaveAlert,
    private datePipe: DatePipe) {

    this.assetVerificationForm = this.formBuilder.group({
      ReceiptNo: [null, Validators.required],
      ReceiptDate: [null],
      DocumentDate: [null],
      DocumentNo: [null, Validators.required],
      VerifierRemarks: [null, Validators.required]
    });
  }

  async ngOnInit() {
    this.columnReceiptDefs = [
      { field: 'productId', sortable: true, filter: true, hide: true, width: 150 },
      { field: 'productCode', sortable: true, filter: true, width: 150 },
      { field: 'productName', sortable: true, filter: true, width: 160 },
      { field: 'productDescription', sortable: true, filter: true, width: 160 },
      { field: 'quantity', sortable: true, filter: true, width: 120 },
      { field: 'purchasePrice', sortable: true, filter: true, width: 160 },
      { headerName: 'Supp Part No', field: 'manufacturePartNo', sortable: true, filter: true, width: 150 },
      { field: 'brandId', sortable: true, filter: true, hide: true, width: 150 },
      { field: 'brandName', sortable: true, filter: true, width: 150 },
      { field: 'modelId', sortable: true, filter: true, hide: true, width: 150 },
      { field: 'modelName', sortable: true, filter: true, width: 150 },
      { headerName: 'Asset Status', field: 'assetStatusDisplayText', sortable: true, filter: true, width: 150 },
      { headerName: 'Asset Condition', field: 'assetConditionDisplayText', sortable: true, filter: true, width: 160 },
      { field: 'serialNo', sortable: true, filter: true, width: 150 }
    ];

    this.SetDatePickerInitValue();

    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.receiptId = params['id'];
        this.editMode = true;
  

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }



  private SetDatePickerInitValue() {
    const today = new Date();
    const datepart = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    $('#ReceiptDate').datetimepicker({
      format: 'L'
    });

    $('#DocumentDate').datetimepicker({
      format: 'L'
    });

    $("#ReceiptDate .datetimepicker-input").val(datepart); // Assign the value
    $("#ReceiptDate .datetimepicker-input").trigger("click"); // Trigger click

    $("#DocumentDate .datetimepicker-input").val(datepart); // Assign the value
    $("#DocumentDate .datetimepicker-input").trigger("click");
  }



  get assetVerificationFormControls() { return this.assetVerificationForm.controls; }


  ShowGrid() {
    this.router.navigateByUrl('/receipt');
  }

  disableControls() {
    this.assetVerificationFormControls.ReceiptNo.disable();
    this.assetVerificationFormControls.DocumentNo.disable();
    $('#DocumentDate .datetimepicker-input').prop("disabled", true);
    $('#ReceiptDate .datetimepicker-input').prop("disabled", true);
    //this.assetVerificationFormControls.VerifierRemarks.disable();
    //this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.receiptId = '';
    this.assetVerificationFormControls.ReceiptNo.setValue('');
    this.assetVerificationFormControls.DocumentNo.setValue('');
    this.assetVerificationFormControls.DocumentDate.setValue('');
    this.assetVerificationFormControls.ReceiptDate.setValue('');
    this.assetVerificationFormControls.VerifierRemarks.setValue('');

  }

  // ShowEditViewAssetVerification(data: ReceiptMasterModel) {
  //   this.assetVerificationFormControls.ReceiptNo.setValue(data.receiptId);
  //   this.assetVerificationFormControls.DocumentNo.setValue(data.refDocumentNo);
  //   $('#DocumentDate .datetimepicker-input').val(this.transformDate(data.refDocumentDate));
  //   $('#ReceiptDate .datetimepicker-input').val(this.transformDate(data.receiptDate));
  //   this.assetVerificationFormControls.VerifierRemarks.setValue('');
  //   this.rowReceiptData = data.itemLines;
  //   //this.UpdateReceiptSubGridRows();
  //   this.disableControls();
  // }

  transformDate(date: Date) {
    return this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  private UpdateReceiptSubGridRows() {
   // this.gridApi.setRowData(this.rowReceiptData);
    this.gridApi.redrawRows();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  // SaveAssetVerification(status: number) {
  //   this.submitted = true;
  //   this.error = '';
  //   // stop here if form is invalid
  //   if (this.assetVerificationForm.invalid) {
  //     return;
  //   }
  //   // if (!(this.rowReceiptData.length > 0)) {
  //   //   this.error = 'Please add receipt line items';
  //   //   return;
  //   // }
  //   let saveResponse: Observable<any>;

  //  // saveResponse = this.receiptMasterService.approveOrHoldReceipt(this.receiptId, this.assetVerificationFormControls.VerifierRemarks.value, status);


  //   saveResponse.subscribe(
  //     result => {
  //       this.saveAlert.SuccessMessage();
  //       this.submitted = false;        
  //       this.ShowGrid();
  //     },
  //     err => {
  //       this.error = err.error ? err.error : err.message;
  //       this.loading = false;
  //     }
  //   );

  // }


}

