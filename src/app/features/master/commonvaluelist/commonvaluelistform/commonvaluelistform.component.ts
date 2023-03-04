import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonValueListService } from '../../../../core/service/commonlistvalue.service';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { CommonValueListModel } from '../../../../shared/model/CommonValueListModel';
import { ValueListNames } from '../../../../shared/model/ValueListNames';
import { Observable } from 'rxjs';

@Component({
  selector: 'org-fat-commonvaluelistform',
  templateUrl: './commonvaluelistform.component.html',
  styleUrls: ['./commonvaluelistform.component.scss']
})
export class CommonvaluelistformComponent implements OnInit {
  commonvaluelistmasterform: FormGroup;
  submitted: boolean = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  valueId!: string;
  listNamesCodes!: ValueListNames[];
  error = '';
  editMode: boolean = false;
  commonvaluelistData!: CommonValueListModel;
  commonvaluelistmastermodel: CommonValueListModel = new CommonValueListModel;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commonvaluelistmasterservice: CommonValueListService,
    private saveAlert: SaveAlert) {
    this.commonvaluelistmasterform = this.formBuilder.group({
      ListName: [null, Validators.required],
      ValueId: [null, Validators.required],
      DisplayText: [null, Validators.required]
    });
  }

  async ngOnInit() {
    this.listNamesCodes = await this.commonvaluelistmasterservice.getListNames();
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.valueId = params['id'];
        this.editMode = true;
        this.commonvaluelistData = this.commonvaluelistmasterservice.getCommonValueListMasterByKey(this.valueId) as CommonValueListModel;
        this.ShowEditViewCommonValueListMaster(this.commonvaluelistData);

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }

  get commonvaluelistmasterFormControls() { return this.commonvaluelistmasterform.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/valuelist');
  }

  disableControls() {
    this.commonvaluelistmasterFormControls.ListName.disable();
    this.commonvaluelistmasterFormControls.ValueId.disable();
    this.commonvaluelistmasterFormControls.DisplayText.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.valueId = '';
    this.commonvaluelistmasterFormControls.ListName.setValue('');
    this.commonvaluelistmasterFormControls.ValueId.setValue('');
    this.commonvaluelistmasterFormControls.DisplayText.setValue('');
  }

  ShowEditViewCommonValueListMaster(data: CommonValueListModel) {
    this.commonvaluelistmasterFormControls.ListName.setValue(data.listName);
    this.commonvaluelistmasterFormControls.ValueId.setValue(data.value);
    this.commonvaluelistmasterFormControls.DisplayText.setValue(data.displayText);
    this.commonvaluelistmasterFormControls.ValueId.disable();
  }

  SaveCommonValueListMaster() {
    let saveResponse: Observable<any>;
    this.submitted = true;

    // stop here if form is invalid
    if (this.commonvaluelistmasterform.invalid) {
      return;
    }
    this.loading = true;
    this.commonvaluelistmastermodel = new CommonValueListModel;
    this.commonvaluelistmastermodel.listName = this.commonvaluelistmasterFormControls.ListName.value;
    this.commonvaluelistmastermodel.value = this.commonvaluelistmasterFormControls.ValueId.value;
    this.commonvaluelistmastermodel.displayText = this.commonvaluelistmasterFormControls.DisplayText.value;

    if (this.editMode) {
      saveResponse = this.commonvaluelistmasterservice.editCommonValueListmaster(this.commonvaluelistmastermodel);
    } else {
      saveResponse = this.commonvaluelistmasterservice.addCommonValueListmaster(this.commonvaluelistmastermodel);
    }


    saveResponse.subscribe(
      result => {
        this.saveAlert.SuccessMessage();
        //if (!this.editMode)
        //this.commonvaluelistmastermodel.value = result.value;
        this.commonvaluelistmasterservice.AddOrEditRecordToCache(this.commonvaluelistmastermodel, this.editMode);
        this.submitted = false;
        if (this.editMode) {
          this.ShowGrid();
        }
        else
        {
          this.ClearContents();
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

