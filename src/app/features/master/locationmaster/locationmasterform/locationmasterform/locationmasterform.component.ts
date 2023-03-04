import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocationmasterService } from '../../../../../core/service/locationmaster.service';
import { SaveAlert } from '../../../../../shared/commonalerts/savealert';
import { LocationMasterModel } from '../../../../../shared/model/LocationMasterModel';
declare var $: any;

@Component({
  selector: 'org-fat-locationmasterform',
  templateUrl: './locationmasterform.component.html',
  styleUrls: ['./locationmasterform.component.scss']
})
export class LocationmasterformComponent implements OnInit {
  locationmasterform: FormGroup;
  submitted = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  locationId!: number;
  error = '';
  editMode: boolean = false;
  locationData!: LocationMasterModel;
  locationmastermodel: LocationMasterModel = new LocationMasterModel;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private locationmasterservice: LocationmasterService,
    private saveAlert: SaveAlert) {
    this.locationmasterform = this.formBuilder.group({
      LocationCode: [null, Validators.required],
      LocationName: [null, Validators.required]
    });
  }

  async ngOnInit() {

 
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.locationId = +params['id'];
        this.editMode = true;
        this.locationData = this.locationmasterservice.getLocationMasterByKey(this.locationId) as LocationMasterModel;
        this.ShowEditViewLocationMaster(this.locationData);

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }

  get locationmasterFormControls() { return this.locationmasterform.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/location');
  }

  disableControls() {
    this.locationmasterFormControls.LocationCode.disable();
    this.locationmasterFormControls.LocationName.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.locationId = 0;
    this.locationmasterFormControls.LocationCode.setValue('');
    this.locationmasterFormControls.LocationName.setValue('');
  }

  ShowEditViewLocationMaster(data: LocationMasterModel) {
    this.locationmasterFormControls.LocationCode.setValue(data.locationCode);
    this.locationmasterFormControls.LocationName.setValue(data.locationName);
    this.locationmasterFormControls.LocationCode.disable();
  }

  SaveLocationMaster() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.locationmasterform.invalid) {
      return;
    }
    this.loading = true;
    let saveResponse: Observable<any>;
    this.locationmastermodel = new LocationMasterModel;
    this.locationmastermodel.locationID = this.locationId;
    this.locationmastermodel.locationCode = this.locationmasterFormControls.LocationCode.value;
    this.locationmastermodel.locationName = this.locationmasterFormControls.LocationName.value;

    if (this.editMode) {
      saveResponse = this.locationmasterservice.editLocationmaster(this.locationmastermodel);
    } else {
      saveResponse = this.locationmasterservice.addLocationmaster(this.locationmastermodel);
    }


    saveResponse.subscribe(
      result => {
        if (!this.editMode) {
          this.locationmastermodel.locationID = result.locationID;
          this.ClearContents();
        }
        this.saveAlert.SuccessMessage();

        this.locationmasterservice.AddOrEditRecordToCache(this.locationmastermodel, this.editMode);
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