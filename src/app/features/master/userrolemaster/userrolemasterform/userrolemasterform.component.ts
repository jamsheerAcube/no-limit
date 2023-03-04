import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userrolemasterservice } from 'src/app/core/service/userrolemaster.service';
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';
import { UserRoleMasterModel } from 'src/app/shared/model/UserRoleMasterModel';
declare var $: any;

@Component({
  selector: 'app-userrolemasterform',
  templateUrl: './userrolemasterform.component.html',
  styleUrls: ['./userrolemasterform.component.css']
})
export class UserrolemasterformComponent implements OnInit {
  UserRoleMasterForm: FormGroup;
  submitted: boolean = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  UserRoleId!: number;
  error = '';
  editMode: boolean = false;
  UserRoleData!: UserRoleMasterModel;
  userRoleMasterModel: UserRoleMasterModel = new UserRoleMasterModel;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private saveAlert: SaveAlert,
    private userRoleMasterService: userrolemasterservice) { 
      this.UserRoleMasterForm = this.formBuilder.group({
        RoleName: ['', Validators.required],
       // RoleType: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['id'] != undefined) {
        this.UserRoleId = +params['id'];
        this.editMode = true;
        this.UserRoleData = this.userRoleMasterService.getUserRoleMasterByKey(this.UserRoleId) as UserRoleMasterModel;
        this.ShowEditViewUserRoleMaster(this.UserRoleData);
        
        if (params['state'] === 'view')
        {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
  });
  // $('[name="RoleType"]').on("change", () => {
  //   this.UserRoleMasterFormControls.RoleType.setValue($('[name="RoleType"]').val());
  // });
  }
  get UserRoleMasterFormControls() { return this.UserRoleMasterForm.controls; }

  ShowGrid(){
    this.router.navigateByUrl('/userrolemaster');
  }

  disableControls() {
    this.UserRoleMasterFormControls.RoleName.disable();
    // this.UserRoleMasterFormControls.RoleType.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.UserRoleId = 0;
    this.UserRoleMasterFormControls.RoleName.setValue(null);
    // this.UserRoleMasterFormControls.RoleType.setValue(null);
  }
  ShowEditViewUserRoleMaster(data: UserRoleMasterModel) {
    this.UserRoleMasterFormControls.RoleName.setValue(data.roleName);
    // this.UserRoleMasterFormControls.RoleType.setValue(data.roleType);
  }

  SaveUserRoleMaster(){
    this.error='';
    let saveResponse: Observable<any>;
    this.submitted = true;

    // stop here if form is invalid
  if (this.UserRoleMasterForm.invalid) {
    return;
}
    this.loading = true;
    this.userRoleMasterModel=new UserRoleMasterModel;
    this.userRoleMasterModel.id = this.UserRoleId;
    this.userRoleMasterModel.roleName = this.UserRoleMasterFormControls.RoleName.value;
    // this.userRoleMasterModel.roleType = this.UserRoleMasterFormControls.RoleType.value;
    
    if(this.editMode){
     saveResponse = this.userRoleMasterService.editUserRoleMaster(this.userRoleMasterModel);
    } else {
      saveResponse = this.userRoleMasterService.addUserRolemaster(this.userRoleMasterModel);
  }

  
  saveResponse.subscribe(
    result => {
      if (!this.editMode) {
        this.userRoleMasterModel.id = result.id;
        this.ClearContents();
      }
      this.saveAlert.SuccessMessage();
      this.userRoleMasterService.AddOrEditRecordToCache(this.userRoleMasterModel, this.editMode);
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
