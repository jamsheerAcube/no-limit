import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentmasterService } from '../../../../core/service/departmentmaster.service';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { DepartmentMasterModel } from '../../../../shared/model/DepartmentMasterModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-fat-departmentmasterform',
  templateUrl: './departmentmasterform.component.html',
  styleUrls: ['./departmentmasterform.component.scss']
})
export class DepartmentmasterformComponent implements OnInit {
  departmentmasterform: FormGroup;
  submitted: boolean = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  departmentID!: number;
  error = '';
  editMode: boolean = false;
  departmentData!: DepartmentMasterModel;
  departmentmastermodel: DepartmentMasterModel = new DepartmentMasterModel;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentmasterservice: DepartmentmasterService,
    private saveAlert: SaveAlert) {
    this.departmentmasterform = this.formBuilder.group({
      DepartmentCode: [null, Validators.required],
      DepartmentName: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.departmentID = +params['id'];
        this.editMode = true;
        this.departmentData = this.departmentmasterservice.getDepartmentMasterByKey(this.departmentID) as DepartmentMasterModel;
        this.ShowEditViewDepartmentMaster(this.departmentData);

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }

  get departmentmasterFormControls() { return this.departmentmasterform.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/departmentmaster');
  }

  disableControls() {
    this.departmentmasterFormControls.DepartmentCode.disable();
    this.departmentmasterFormControls.DepartmentName.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.departmentID = 0;
    this.departmentmasterFormControls.DepartmentCode.setValue('');
    this.departmentmasterFormControls.DepartmentName.setValue('');
  }

  ShowEditViewDepartmentMaster(data: DepartmentMasterModel) {
    this.departmentmasterFormControls.DepartmentCode.setValue(data.departmentCode);
    this.departmentmasterFormControls.DepartmentName.setValue(data.departmentName);
    this.departmentmasterFormControls.DepartmentCode.disable();
  }

  SaveDepartmentMaster() {
    let saveResponse: Observable<any>;
    this.submitted = true;

    // stop here if form is invalid
    if (this.departmentmasterform.invalid) {
      return;
    }
    this.loading = true;
    this.departmentmastermodel = new DepartmentMasterModel;
    this.departmentmastermodel.departmentID = this.departmentID;
    this.departmentmastermodel.departmentCode = this.departmentmasterFormControls.DepartmentCode.value;
    this.departmentmastermodel.departmentName = this.departmentmasterFormControls.DepartmentName.value;

    if (this.editMode) {
      saveResponse = this.departmentmasterservice.editDepartmentmaster(this.departmentmastermodel);
    } else {
      saveResponse = this.departmentmasterservice.addDepartmentmaster(this.departmentmastermodel);
    }


    saveResponse.subscribe(
      result => {
        if (!this.editMode) {
          this.departmentmastermodel.departmentID = result.departmentID;
          this.ClearContents();
        }
        this.saveAlert.SuccessMessage();
        this.departmentmasterservice.AddOrEditRecordToCache(this.departmentmastermodel, this.editMode);
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
