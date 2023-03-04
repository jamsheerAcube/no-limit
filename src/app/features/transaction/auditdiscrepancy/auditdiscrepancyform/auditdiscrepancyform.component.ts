import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { AssetAuditService } from '../../../../core/service/assetaudit.service';
import { ModalService } from '../../../../..../../core/_modal';
import { ROUND_ANTICLOCK_ANIMATION } from '../../../../shared/animations/round-anticlock.animation';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { AssetAuditVerifyModel } from '../../../../shared/model/AssetAuditVerifyModel';
import { AssetVerificationModel } from '../../../../shared/model/AssetVerificationModel';
import { AssetAuditModel } from 'src/app/shared/model/AssetAuditModel';
declare var $: any;

@Component({
  selector: 'org-fat-auditdiscrepancyform',
  templateUrl: './auditdiscrepancyform.component.html',
  styleUrls: ['./auditdiscrepancyform.component.scss'],
  styles: [],
  animations: [
    ROUND_ANTICLOCK_ANIMATION
  ]
})
export class AuditdiscrepancyformComponent implements OnInit {
  @ViewChild('agGridLocation') agGridLocation!: AgGridAngular;
  @ViewChild('agGridMissing') agGridMissing!: AgGridAngular;
  @ViewChild('agGridDisabled') agGridDisabled!: AgGridAngular;
  @ViewChild('agGridfound') agGridfound!: AgGridAngular;
  @ViewChild('agGridNew') agGridNew!: AgGridAngular;

  auditdiscrepancyform: FormGroup;
  submitted = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  receiptId!: string;
  error = '';
  errorReceipt = '';
  editMode: boolean = false;
  assetverificationmodel: AssetVerificationModel = new AssetVerificationModel;
  rowAuditLocationDiscrepancyData!: AssetAuditModel[];
  rowAuditMissingData!: AssetAuditModel[];
  rowAuditNewData!: AssetAuditModel[];
  rowAuditFound!: AssetAuditModel[];
  rowAuditDisabled!: AssetAuditModel[];
  columnReceiptDefs: any;
  gridApi: any;
  gridColumnApi: any;
  auditId!: string;
  auditDate!: Date;
  missingRowClicked: boolean = false;
  disabledRowClicked: boolean = false;
  locationRowClicked: boolean = false;
  isNewAssetsRowClicked: boolean = false;
  locationDiscrepancyCount!: number;
  missingAssetsCount!: number;
  newAssetsCount!: number;
  foundCount!: number;
  disableCount!: number;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private saveAlert: SaveAlert,
    private modalService: ModalService,
    private assetAuditService: AssetAuditService) {

    this.auditdiscrepancyform = this.formBuilder.group({
      AuditNo: [null],
      AuditDate: [null]
    });
  }

  async ngOnInit() {
    this.columnReceiptDefs = [
      { field: 'serialNo', sortable: true, filter: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true
    },
    // { field: 'iteM_ID', sortable: true, filter: true, hide: true },
    //   { field: 'itemCode', sortable: true, filter: true },
    //   { field: 'itemName', sortable: true, filter: true },
    //   { headerName: 'Lot Number',field: 'loT_NUMBER', sortable: true, filter: true },
    //   { field: 'loC_ID', sortable: true, filter: true, hide: true },
    //   { field: 'locationCode', sortable: true, filter: true },
    //   { field: 'locationName', sortable: true, filter: true },
    //   { field: 'scannedloC_ID', sortable: true, filter: true, hide: true },
    //   { field: 'scanLocationCode', sortable: true, filter: true },
    //   { field: 'scanLocationName', sortable: true, filter: true },
    //   { field: 'lineStatus', sortable: true, filter: true, hide: true },
    //   { headerName: 'Status',field: 'statusText', sortable: true, filter: true },
    { field: 'productCode', sortable: true, resizable: true, filter: true },
    { field: 'product', sortable: true, resizable: true, filter: true },
    { field: 'barcode', sortable: true, resizable: true, filter: true },
    { field: 'department', sortable: true, resizable: true, filter: true },
    { field: 'brand', sortable: true, resizable: true, filter: true },
    { field: 'size', sortable: true, resizable: true, filter: true },
    { field: 'color', sortable: true, resizable: true, filter: true },
    { field: 'lifestyle', sortable: true, resizable: true, filter: true },
    { field: 'concept', sortable: true, resizable: true, filter: true },
    { field: 'patternNo', sortable: true, resizable: true, filter: true },
    { field: 'productFeature', sortable: true, resizable: true, filter: true },
    { field: 'neck', sortable: true, resizable: true, filter: true },
    { field: 'cut', sortable: true, resizable: true, filter: true },
    { field: 'length', sortable: true, resizable: true, filter: true },
    { field: 'embelishment', sortable: true, resizable: true, filter: true },
    { field: 'sleeve', sortable: true, resizable: true, filter: true },
    { field: 'texture', sortable: true, resizable: true, filter: true },
    { field: 'material', sortable: true, resizable: true, filter: true },
    { field: 'fit', sortable: true, resizable: true, filter: true },
    { field: 'collar', sortable: true, resizable: true, filter: true },

    ];

    this.route.queryParamMap.subscribe((params: any) => {
      this.auditId = params.params.auditNo;
      //this.auditDate = params.params.auditDate;

    });

    this.rowAuditLocationDiscrepancyData = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 3);
    this.rowAuditMissingData = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 0);
    this.rowAuditNewData = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 2);
    this.rowAuditFound = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 1);
    this.rowAuditDisabled = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 6);
    this.locationDiscrepancyCount = this.rowAuditLocationDiscrepancyData.length;
    this.missingAssetsCount = this.rowAuditMissingData.length;
    this.newAssetsCount = this.rowAuditNewData.length;
    this.foundCount = this.rowAuditFound.length;
    this.disableCount = this.rowAuditDisabled.length;
  }

  get auditdiscrepancyFormControls() { return this.auditdiscrepancyform.controls; }


  ShowGrid() {
    this.router.navigateByUrl('/physicalcount');
  }

  disableControls() {

  }

  ClearContents() {

  }


  onDataGridSelectionChanged(event: any) {
    var locationChangeSelectedRows=this.agGridLocation.api.getSelectedRows();
    if(locationChangeSelectedRows.length>0)
    this.locationRowClicked = true;
    else
    this.locationRowClicked = false;
  }

  onDisabledDataGridSelectionChanged(event: any) {
    var disabledSelectedRows=this.agGridDisabled.api.getSelectedRows();
    if(disabledSelectedRows.length>0)
    this.disabledRowClicked = true;
    else
    this.disabledRowClicked = false;
  }

  onMissingDataGridSelectionChanged(event: any) {
    var missingSelectedRows=this.agGridMissing.api.getSelectedRows();
    if(missingSelectedRows.length>0)
    this.missingRowClicked = true;
    else
    this.missingRowClicked = false;
  }


  ReScan() {
    var saveResponse = this.assetAuditService.Rescan(this.auditId);
    saveResponse.subscribe(
      result => {
        this.saveAlert.SuccessMessage();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./'], { queryParams: { auditNo: this.auditId, auditDate: this.auditDate }, relativeTo: this.route });
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }

  AcceptLocationChange() {
    var selectedSerialNos = this.agGridLocation.api.getSelectedRows().map(item => { return item.serialNo }).join(",");
    var array = selectedSerialNos.split(',');
    var saveResponse = this.assetAuditService.acceptLocationChange(this.auditId, array);

    saveResponse.subscribe(
      async result => {
        this.saveAlert.SuccessMessage();
        this.rowAuditLocationDiscrepancyData = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 3);
        this.agGridLocation.api.setRowData(this.rowAuditLocationDiscrepancyData);
        this.agGridLocation.api.redrawRows();
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }

  InActivateSerialNo() {
    var selectedSerialNos = this.agGridMissing.api.getSelectedRows().map(item => { return item.serialNo }).join(",");
    var array = selectedSerialNos.split(',');
    var saveResponse = this.assetAuditService.inActivateSerialNo(this.auditId, array);

    saveResponse.subscribe(
      async result => {
        this.saveAlert.SuccessMessage();
        this.rowAuditMissingData = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 0);
        this.agGridMissing.api.setRowData(this.rowAuditMissingData);
        this.agGridMissing.api.redrawRows();
        this.missingAssetsCount=this.rowAuditMissingData.length;
        this.rowAuditDisabled = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 6);
        this.agGridDisabled.api.setRowData(this.rowAuditDisabled);
        this.agGridDisabled.api.redrawRows();
        this.disableCount=this.rowAuditDisabled.length;
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }

  ActivateSerialNo() {
    var selectedSerialNos = this.agGridDisabled.api.getSelectedRows().map(item => { return item.serialNo }).join(",");
    var array = selectedSerialNos.split(',');
    var saveResponse = this.assetAuditService.ActivateSerialNo(this.auditId, array);

    saveResponse.subscribe(
      async result => {
        this.saveAlert.SuccessMessage();
        this.rowAuditDisabled = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 6);
        this.agGridDisabled.api.setRowData(this.rowAuditDisabled);
        this.agGridDisabled.api.redrawRows();
        this.disableCount=this.rowAuditDisabled.length;
        this.rowAuditFound = await this.assetAuditService.getAuditVerifyDetailsByStatus(this.auditId, 1);
        this.agGridfound.api.setRowData(this.rowAuditFound);
        this.agGridfound.api.redrawRows();
        this.foundCount=this.rowAuditFound.length;
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }

  onLocationRowClick(event: any) {
    // this.locationRowClicked = true;
  }

  onNewAssetsRowClick(event: any) {
    this.isNewAssetsRowClicked = true;
  }

  openModal(id: string) {
    var assetRegisterSerialNo = this.agGridNew.api.getSelectedRows()[0].serialNo;
    this.router.navigate([{ outlets: { assetregisterpopup: ['assetregister', 'add', assetRegisterSerialNo] } }], { queryParams: { popup: 1, auditNo: this.auditId, auditDate: this.auditDate } });
    //this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}