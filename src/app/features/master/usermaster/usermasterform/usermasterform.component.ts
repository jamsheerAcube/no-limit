import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeviewHelper, TreeviewItem } from 'ngx-treeview';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/core/login/login.component';
import { EmployeeMasterService } from 'src/app/core/service/employeemaster.service';
import { OrganizationmasterService } from 'src/app/core/service/organizationmaster.service';
import { UserMasterService } from 'src/app/core/service/usermaster.service';
import { userrolemasterservice } from 'src/app/core/service/userrolemaster.service';
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';
import { EmployeeMasterModel } from 'src/app/shared/model/EmployeeMasterModel';
import { OrganizationMasterModel } from 'src/app/shared/model/OrganizationMasterModel';
import { UserOrgMapping } from 'src/app/shared/model/user';
import { UserMasterModel } from 'src/app/shared/model/UserMasterModel';
import { UserRoleMasterModel } from 'src/app/shared/model/UserRoleMasterModel';
declare var $: any;

@Component({
  selector: 'app-usermasterform',
  templateUrl: './usermasterform.component.html',
  styleUrls: ['./usermasterform.component.css']
})
export class UsermasterformComponent implements OnInit {
  treeviewConfig: any;
  organizationList!: TreeviewItem[];
  UserMasterForm: FormGroup;
  submitted: boolean = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  UserName!: string;
  error = '';
  editMode: boolean = false;
  UserData!: UserMasterModel;
  userMasterModel: UserMasterModel = new UserMasterModel;
  employees:EmployeeMasterModel[]=[];
  userroles:UserRoleMasterModel[]=[];
  OrgSelectedNodes: string[] = [];
  OrgMasterData:OrganizationMasterModel[]=[];
  render: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private saveAlert: SaveAlert,
    private userMasterService: UserMasterService, 
    private employeemasterservice:EmployeeMasterService,
    private userrolemasterservice:userrolemasterservice,private cdRef: ChangeDetectorRef,private orgmasterservice:OrganizationmasterService) {
      this.UserMasterForm = this.formBuilder.group({
        UserRoleSelCode: ['', Validators.required],
        EmployeeSelCode: ['', Validators.required],
        UserName: ['', Validators.required],
        Password: ['', Validators.required],
      });
     }

  async ngOnInit() {
    this.treeviewConfig = {
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: false,
      decoupleChildFromParent: false,
      maxHeight: 175,
      hasDivider: true,
      collapsed:true
    }
    this.organizationList=[];
    this.route.params.subscribe(async params => {
      if(params['id'] != undefined) {
        this.UserName = params['id'];
        this.editMode = true;
        this.UserData = this.userMasterService.getUserMasterByKey(this.UserName) as UserMasterModel;
        this.ShowEditViewUserMaster(this.UserData);
        this.organizationList=[];
        this.OrgMasterData=await this.orgmasterservice.getOrganizationMaster(true);
        this.generateChild(this.OrgMasterData,this.UserData.userOrgMapping);
        this.UserData.userOrgMapping.forEach(element => {
          this.OrgSelectedNodes.push(element.orgID.toString());
        });
        if (params['state'] === 'view')
        {
          this.disableControls();
        }
      } else {
        this.editMode = false;
        this.organizationList=[];
        this.OrgMasterData=await this.orgmasterservice.getOrganizationMaster(true);
        console.log(this.OrgMasterData);
        this.generateChild(this.OrgMasterData,[]);
      }
  });
  $('.select2bs4').select2();
  $('[name="UserRoleSelCode"]').on("change", () => {
    this.UserMasterFormControls.UserRoleSelCode.setValue($('[name="UserRoleSelCode"]').val());
  });
  $('[name="EmployeeSelCode"]').on("change", () => {
    this.UserMasterFormControls.EmployeeSelCode.setValue($('[name="EmployeeSelCode"]').val());
  });
  this.employees=await this.employeemasterservice.getEmployeeMaster();
  this.userroles=await this.userrolemasterservice.getUserRoleMaster();
  }

  onOrgSelectionChange(selectedValues: string[]) {
    console.log('selected values:', selectedValues);
    this.OrgSelectedNodes = selectedValues;
  }

  get UserMasterFormControls() { return this.UserMasterForm.controls; }
  ShowGrid(){
    this.router.navigateByUrl('/usermaster');
  }
  disableControls() {
    this.UserMasterFormControls.UserRoleSelCode.disable();
    this.UserMasterFormControls.EmployeeSelCode.disable();
    this.UserMasterFormControls.UserName.disable();
    this.UserMasterFormControls.Password.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  setItemsSelectedInTreeView(itemsToBeSelected: TreeviewItem[], valuesSelected: string[]) {
    const changeSelection = (valuesSelected: any) => {
      valuesSelected.forEach((element: any) => {
        const foundItem = TreeviewHelper.findItemInList(itemsToBeSelected, element);
        foundItem.checked = true;
      });
      this.renderer(itemsToBeSelected);
    }
    changeSelection(valuesSelected);
  }

  setItemsDisabledInTreeView(itemsToBeSelected: TreeviewItem[]) {
    const changeSelection = (valuesSelected: any) => {
      valuesSelected.forEach((element: any) => {
        element.disabled = true;
      });
      this.renderer(itemsToBeSelected);
    }
    changeSelection(itemsToBeSelected);
  }

  setItemsUnSelectedInTreeView(itemsToBeSelected: TreeviewItem[], valuesSelected: string[]) {
    const changeSelection = (valuesSelected: any) => {
      valuesSelected.forEach((element: any) => {
        const foundItem = TreeviewHelper.findItemInList(itemsToBeSelected, element);
        console.log(foundItem);
        foundItem.checked = false;
      });
      this.renderer(itemsToBeSelected);
    }

    changeSelection(valuesSelected);
  }

  renderer(itemsToBeSelected: TreeviewItem[]) {
    itemsToBeSelected.forEach(element => {
      element.correctChecked();
    });
    this.render = true;
    this.cdRef.detectChanges();
    this.render = false;
  }

  generateChild(orgList:OrganizationMasterModel[],existingorgList:UserOrgMapping[])
  {
    orgList.forEach(el => {
      const menuitem=new TreeviewItem({ text: el.orgName, value: el.orgID, checked: existingorgList==null || existingorgList.length<=0
         ? false:existingorgList.filter(p=>p.orgID==el.orgID)[0]==null ?false: true,collapsed:true});
      this.organizationList.push(menuitem);
    });
  }
  
  async ClearContents() {
    this.UserName = '';
    this.UserMasterFormControls.UserRoleSelCode.setValue(null);
    this.UserMasterFormControls.EmployeeSelCode.setValue(null);
    this.UserMasterFormControls.UserName.setValue(null);
    this.UserMasterFormControls.Password.setValue(null);
    $('[name="UserRoleSelCode"]').select2().trigger('change');
    $('[name="EmployeeSelCode"]').select2().trigger('change');
    this.organizationList=[];
    this.OrgMasterData=await this.orgmasterservice.getOrganizationMaster(true);
    this.generateChild(this.OrgMasterData,[]);
  }
  ShowEditViewUserMaster(data: UserMasterModel) {
    this.UserMasterFormControls.UserRoleSelCode.setValue(data.userRoleID);
    this.UserMasterFormControls.EmployeeSelCode.setValue(data.employeeId);
    this.UserMasterFormControls.UserName.setValue(data.userName);
    this.UserMasterFormControls.Password.setValue(null);
  }
  SaveUserMaster(){
    this.error='';
    let saveResponse: Observable<any>;
    this.submitted = true;
    if(this.OrgSelectedNodes.length<=0)
    {
     this.error='Please select organization';
    }
    // stop here if form is invalid
  if (this.UserMasterForm.invalid) {
    return;
}
this.submitted = false;
    this.loading = true;
    this.userMasterModel=new UserMasterModel;
    this.userMasterModel.userName = this.UserMasterFormControls.UserName.value;
    this.userMasterModel.userRoleID = this.UserMasterFormControls.UserRoleSelCode.value;
    this.userMasterModel.employeeId = this.UserMasterFormControls.EmployeeSelCode.value;
    this.userMasterModel.password = this.UserMasterFormControls.Password.value;
    this.userMasterModel.employeeName = this.employees.filter(p=>p.employeeId==this.UserMasterFormControls.EmployeeSelCode.value)[0].firstName;
    this.userMasterModel.employeeCode = this.employees.filter(p=>p.employeeId==this.UserMasterFormControls.EmployeeSelCode.value)[0].employeeCode;
    this.userMasterModel.roleName = this.userroles.filter(p=>p.id==this.UserMasterFormControls.UserRoleSelCode.value)[0].roleName;
    var userOrgmapping:UserOrgMapping[]=[];
this.OrgSelectedNodes.forEach(element => {
  var userorgMapModel:UserOrgMapping=new UserOrgMapping;
  userorgMapModel.orgID=element;
  userOrgmapping.push(userorgMapModel)
});
this.userMasterModel.userOrgMapping=userOrgmapping;
    console.log(this.userMasterModel);
    if(this.editMode){
     saveResponse = this.userMasterService.editUserMaster(this.userMasterModel);
    } else {
      saveResponse = this.userMasterService.addUsermaster(this.userMasterModel);
  }

  
  saveResponse.subscribe(
    result => {
      if (!this.editMode) {
       // this.userMasterModel.userName = result.id;
        this.ClearContents();
      }
      this.saveAlert.SuccessMessage();
      this.userMasterService.AddOrEditRecordToCache(this.userMasterModel, this.editMode);
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
