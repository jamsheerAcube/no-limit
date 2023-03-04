import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrganizationmasterService } from 'src/app/core/service/organizationmaster.service';
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';
import { OrganizationMasterModel } from 'src/app/shared/model/OrganizationMasterModel';

@Component({
  selector: 'org-fat-orgmasterform',
  templateUrl: './orgmasterform.component.html',
  styleUrls: ['./orgmasterform.component.css']
})
export class OrgmasterformComponent implements OnInit {
  organizationmasterform: FormGroup;
  submitted = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  orgId!: number;
  error = '';
  editMode: boolean = false;
  orgData!: OrganizationMasterModel;
  orgmastermodel: OrganizationMasterModel = new OrganizationMasterModel;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private organizationmasterservice: OrganizationmasterService,
    private saveAlert: SaveAlert) {
      this.organizationmasterform = this.formBuilder.group({
        OrgCode: [null, Validators.required],
        OrgName: [null, Validators.required]
      });
     }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.orgId = +params['id'];
        this.editMode = true;
        this.orgData = this.organizationmasterservice.getOrganizationMasterByKey(this.orgId) as OrganizationMasterModel;
        this.ShowEditViewOrgMaster(this.orgData);

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }

  get organizationmasterformControls() { return this.organizationmasterform.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/location');
  }

  disableControls() {
    this.organizationmasterformControls.OrgCode.disable();
    this.organizationmasterformControls.OrgName.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.orgId = 0;
    this.organizationmasterformControls.OrgCode.setValue('');
    this.organizationmasterformControls.OrgName.setValue('');
  }

  ShowEditViewOrgMaster(data: OrganizationMasterModel) {
    this.organizationmasterformControls.OrgCode.setValue(data.orgCode);
    this.organizationmasterformControls.OrgName.setValue(data.orgName);
    this.organizationmasterformControls.OrgCode.disable();
  }

  SaveOrganizationMaster() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.organizationmasterform.invalid) {
      return;
    }
    this.loading = true;
    let saveResponse: Observable<any>;
    this.orgmastermodel = new OrganizationMasterModel;
    this.orgmastermodel.orgID = this.orgId;
    this.orgmastermodel.orgCode = this.organizationmasterformControls.OrgCode.value;
    this.orgmastermodel.orgName = this.organizationmasterformControls.OrgName.value;

    if (this.editMode) {
      saveResponse = this.organizationmasterservice.editOrganizationmaster(this.orgmastermodel);
    } else {
      saveResponse = this.organizationmasterservice.addorganizationmaster(this.orgmastermodel);
    }


    saveResponse.subscribe(
      result => {
        if (!this.editMode) {
          this.orgmastermodel.orgID = result.orgID;
          this.ClearContents();
        }
        this.saveAlert.SuccessMessage();

        this.organizationmasterservice.AddOrEditRecordToCache(this.orgmastermodel, this.editMode);
        this.submitted = false;
        if (this.editMode) {
          this.ShowGrid();
        }
        this.loading = false;
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );

  }

}
