import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeviewItem } from 'ngx-treeview';
import { Observable } from 'rxjs';
import { ReportsService } from 'src/app/core/service/reports.service';
import { prinrFilter } from 'src/app/shared/model/DemoPrintModel';
import { AssetAuditService } from '../../../../core/service/assetaudit.service';
import { LocationmasterService } from '../../../../core/service/locationmaster.service';
import { DepartmentmasterService } from '../../../../core/service/departmentmaster.service';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { AssetAuditModel, RS_AssetAuditModel } from '../../../../shared/model/AssetAuditModel';
import { LocationMasterModel } from '../../../../shared/model/LocationMasterModel';

declare var $: any;

@Component({
  selector: 'org-fat-assetauditform',
  templateUrl: './assetauditform.component.html',
  styleUrls: ['./assetauditform.component.scss']
})
export class AssetauditformComponent implements OnInit {
  selectedorganizationList!: any;
  selectedLocationList: any[] = [];
  selectedItemList: any[] = [];
  selectedBatchList: any[] = [];
  locationList: any[] = [];
  itemList: any[] = [];
  batchList: any[] = [];
  assetAuditForm: FormGroup;
  locationItems!: LocationMasterModel[];
  itemsList!: TreeviewItem[];
  itemsLocationList!: TreeviewItem[];
  error!: string;
  submitted = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  treeviewConfig: any;
  auditId!: string;
  editMode!: boolean;
  viewMode!: boolean;
  auditStatus!: number;
  render: boolean = false;
  departmentList: any[] = [];
  lifestyleList: any[] = [];
  auditData: AssetAuditModel = new AssetAuditModel;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private assetAuditService: AssetAuditService,
    private saveAlert: SaveAlert,
    private router: Router,
    private reportService: ReportsService,
    private locationService: LocationmasterService,
    private departmentService: DepartmentmasterService,
    
    private datePipe: DatePipe,
  ) {

    this.assetAuditForm = this.formBuilder.group({
      remarks: [null, Validators.required],
      LocationSelCode: [null, Validators.required],
      Department: [null],
      LifeStyle: [null],
    });
  }

  async ngOnInit() {
    const today = new Date();
    const datepart = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    $('#AuditOn').datetimepicker({
      format: 'DD-MMM-YYYY'
    });

    $("#AuditOn .datetimepicker-input").val(this.datePipe.transform(new Date(), "dd-MMM-yyyy")); // Assign the value
    $("#AuditOn .datetimepicker-input").trigger("click"); // Trigger click



    await this.loadLocationMaster();
    this.departmentList = await this.assetAuditService.getProductDepartment();
    this.lifestyleList = await this.assetAuditService.getLifeStyle();

    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.auditId = params['id'];
        this.editMode = true;
        this.assetAuditService.getAssetAuditByKey(this.auditId).subscribe(res => {
          this.ShowEditViewAssetAudit(res);
        });
        if (params['state'] === 'view') {
          //this.disableControls();
          //this.viewMode = true;
        }
      } else {
        this.editMode = false;
      }
    });
  }
  async loadLocationMaster() {
    var locationMaster = await this.locationService.getLocationMaster(true);
    this.locationList = locationMaster.map(p => { return { locationName: p.locationCode + ' - ' + p.locationName, locationID: p.locationID, orgID: p.orgID } })
  }

  get assetAuditFormControls() { return this.assetAuditForm.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/physicalcount');
  }

  disableControls() {
    $('#AuditOn .datetimepicker-input').attr('disabled', 'true');
    this.assetAuditFormControls.remarks.disable();
    this.isbtnClearDisabled = true;
    this.isbtnSaveDisabled = true;
  }

  ClearContents() {
    $('#AuditOn .datetimepicker-input').val('');
    this.auditStatus = 0;
    this.auditId = "";
    this.assetAuditForm.reset()
  }

  async ShowEditViewAssetAudit(data: RS_AssetAuditModel) {
    data
    debugger;
    this.auditId = data.auditId;
    $('#AuditOn .datetimepicker-input').val(data.auditDate);
    this.assetAuditFormControls.remarks.setValue(data.remarks);
    this.assetAuditFormControls.remarks.setValue(data.remarks);
    if (data.departments.length > 0) {
      this.assetAuditFormControls.Department.setValue(data.departments.map((p: any) => { return p.department }));
    }
    if (data.lifetStyles.length > 0) {
      this.assetAuditFormControls.Department.setValue(data.lifetStyles.map((p: any) => { return p.lifeStyle }));
    }
    if (data.locations.length > 0) {
      this.assetAuditFormControls.Department.setValue(data.locations.map((p: any) => { return p.locationID }));
    }
    this.isbtnClearDisabled = true;
    if (this.viewMode) {
      this.assetAuditForm.disable()
      $('#AuditOn .datetimepicker-input').attr('disabled', true);
    }
  }

  SaveAssetAudit() {
    this.submitted = true;
    this.error = '';
    // stop here if form is invalid
    if (this.assetAuditForm.invalid) {
      return;
    }
    this.loading = true;
    let saveResponse!: Observable<any>;
    const locale = 'en-US';
    var assetAuditModel = new AssetAuditModel;
    assetAuditModel.auditId = this.auditId;
    let formateddate = this.datePipe.transform($('#AuditOn .datetimepicker-input').val(), "dd-MMM-yyyy");
    assetAuditModel.auditDate = formateddate ? formateddate : "";
    assetAuditModel.remarks = this.assetAuditFormControls.remarks.value;
    assetAuditModel.locations = this.assetAuditFormControls.LocationSelCode.value;
    assetAuditModel.department = this.assetAuditFormControls.Department.value;
    assetAuditModel.lifeStyle = this.assetAuditFormControls.LifeStyle.value;
    debugger;
    if (this.editMode) {
      saveResponse = this.assetAuditService.editAssetAuditmaster(assetAuditModel);
    } else {
      saveResponse = this.assetAuditService.addAssetAudit(assetAuditModel);
    }

    saveResponse.subscribe(
      result => {
        debugger;
        console.log(result);
        if (!this.editMode) {
          // assetAuditModel.auditId = result.auditId;
          // assetAuditModel.createdDate = result.createdDate;
          // assetAuditModel.createdBy = result.createdBy;
          this.ClearContents();
        }
        else {
          // assetAuditModel.createdDate = this.auditData.createdDate;
          // assetAuditModel.createdBy = this.auditData.createdBy;
        }

        assetAuditModel = result;
        this.saveAlert.SuccessMessage();
        this.assetAuditService.onRefreshAssetAudit();
        this.loading = false;
        this.submitted = false;
        if (this.editMode)
          this.ShowGrid();

      },
      err => {
        debugger;
        console.log(err);
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }


}



