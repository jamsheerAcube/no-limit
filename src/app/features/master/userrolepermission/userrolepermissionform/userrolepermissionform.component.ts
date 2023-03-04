import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreeviewHelper, TreeviewItem } from 'ngx-treeview';
import { Observable } from 'rxjs';
import { rolepermissionservice } from 'src/app/core/service/rolepermission.service';
import { userrolemasterservice } from 'src/app/core/service/userrolemaster.service';
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';
import { AppMenuModel } from 'src/app/shared/model/AppMenuModel';
import { UserRoleMasterModel } from 'src/app/shared/model/UserRoleMasterModel';
declare var $: any;
@Component({
  selector: 'app-userrolepermissionform',
  templateUrl: './userrolepermissionform.component.html',
  styleUrls: ['./userrolepermissionform.component.css']
})
export class UserrolepermissionformComponent implements OnInit {
  treeviewConfig: any;
  UserRolePermissionForm: FormGroup;
  SelectedMenuID!:string[];
  render: boolean = false;
  itemsList: TreeviewItem[]=[];
  appMenuList!:AppMenuModel[];
  submitted: boolean = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  userroles:UserRoleMasterModel[]=[];
  constructor(private formBuilder: FormBuilder,
    private saveAlert: SaveAlert,private cdRef: ChangeDetectorRef,private rolePermissionService:rolepermissionservice,
    private userrolemasterservice:userrolemasterservice) { 
      this.UserRolePermissionForm = this.formBuilder.group({
        UserRoleSelCode: [null, Validators.required],
      });
    }

    get UserRolePermissionFormControls() { return this.UserRolePermissionForm.controls; }

  async ngOnInit() {
    this.treeviewConfig = {
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 500
    }
    $('.select2bs4').select2();
  $('[name="UserRoleSelCode"]').on("change", async () => {
   this.UserRolePermissionFormControls.UserRoleSelCode.setValue($('[name="UserRoleSelCode"]').val());
   this.itemsList=[];
   this.SelectedMenuID=[];
   if($('[name="UserRoleSelCode"]').val()!=null && $('[name="UserRoleSelCode"]').val()!='')
   {
    this.appMenuList= await this.rolePermissionService.getAppRoleMenu(localStorage.getItem("appID"),$('[name="UserRoleSelCode"]').val())
    var mobilemenuList= await this.rolePermissionService.getAppRoleMenu('FATMOBILEAPP',$('[name="UserRoleSelCode"]').val())
    mobilemenuList.forEach(element => {
      this.appMenuList.push(element);
    });
    this.generateChild(this.appMenuList);
    console.log(this.loading);
    this.itemsList.forEach(element => {
      this.SelectedMenuID.push(element.value);
      if(element.children!=undefined)
      {
      element.children.forEach(element1 => {
        this.SelectedMenuID.push(element1.value);
        if(element1.children!=undefined)
        {
        element1.children.forEach(element2 => {
          if(element2!=undefined)
          this.SelectedMenuID.push(element2.value);
        });
      }
      });
    }
    });
    // const selectedIds = this.treeView.selection.checkedItems.map(s => s.value);
    // this.SelectedMenuID=selectedIds;
     console.log(this.SelectedMenuID);
   }
   else
   {
    this.appMenuList= await this.rolePermissionService.getAppRoleMenu(localStorage.getItem("appID"),0)
    var mobilemenuList= await this.rolePermissionService.getAppRoleMenu('MOBILEAPP',0)
    mobilemenuList.forEach(element => {
      this.appMenuList.push(element);
    });
    this.generateChild(this.appMenuList);
   }
  });
    this.userroles=await this.userrolemasterservice.getUserRoleMaster();
  this.appMenuList= await this.rolePermissionService.getAppRoleMenu(localStorage.getItem("appID"),0)
  var mobilemenuList= await this.rolePermissionService.getAppRoleMenu('FATMOBILEAPP',0)
  mobilemenuList.forEach(element => {
    this.appMenuList.push(element);
  });
  this.generateChild(this.appMenuList);
  }
  buffer=false;
  generateChild(appMenuList:AppMenuModel[])
  {
    console.log(appMenuList);
    this.buffer=true;
    this.loading=true;
    var constmenusublist1:TreeviewItem[]=[];
    var constmenusublist2:TreeviewItem[]=[];
    appMenuList.forEach(el => {
      const menuitem=new TreeviewItem({ text: el.menuText, value: el.menuID, checked: el.menuID!=el.appMenuID ? false:true,collapsed:true});
      //this.itemsList.push(new TreeviewItem({ text: el.menuText, value: el.menuID, checked: false}));
      constmenusublist1=[];
      el.firstSubMenu.forEach(el1 => {
       
        
        const menusubitem1=new TreeviewItem({ text: el1.menuText, value: el1.menuID, checked:  el1.menuID!=el1.appMenuID ? false:true,collapsed:true});
      
        constmenusublist2=[];
        if(el1.secondSubMenu.length>0)
        {
          el1.secondSubMenu.forEach(el2 => {
            constmenusublist2.push(new TreeviewItem({ text: el2.menuText, value: el2.menuID, checked:  el2.menuID!=el2.appMenuID ? false:true,collapsed:true}));
          });
         // if(constmenusublist2.length>0)
        menusubitem1.children=constmenusublist2;
        console.log('sublist2' + constmenusublist2);
        }
        constmenusublist1.push(menusubitem1);
      
      });
      console.log('sublist1' + constmenusublist1);
     if(constmenusublist1!=null && constmenusublist1.length>0)
     {
      menuitem.children=constmenusublist1;
      this.itemsList.push(menuitem);
     }
    });
    this.loading = false;
    this.buffer=false;
    
  }

  onSubCategorySelectionChange(selectedValues: string[]) {
    this.SelectedMenuID = selectedValues;
  }
  error='';
  addParentMenuID()
  {
    this.SelectedMenuID.forEach(element => {
      console.log(this.appMenuList);
      this.appMenuList.forEach(element1 => {
        element1.firstSubMenu.forEach(element2 => {
          var isSecondSubMenuExist=element2.secondSubMenu.findIndex(p=>p.menuID==element);
          if(isSecondSubMenuExist>=0)
          {
            var isExist=this.SelectedMenuID.findIndex(p=>p==element2.menuID);
            if(isExist<0)
            {
              this.SelectedMenuID.push(element2.menuID);
            }
          }
        });
        var isFirstSubMenuExist=element1.firstSubMenu.findIndex(p=>p.menuID==element);
        if(isFirstSubMenuExist>=0)
        {
          var isExist1=this.SelectedMenuID.findIndex(p=>p==element1.menuID);
          if(isExist1<0)
          {
            this.SelectedMenuID.push(element1.menuID);
          }
        }
        
      });
    });
  }
  SaveUserpermission()
  {
    this.error='';
   if(this.SelectedMenuID.length<=0)
   {
    this.error='Please select menu';
   }
   this.submitted=true;
   this.loading=true;
   if(this.UserRolePermissionForm.invalid)
   {
     this.loading=false;
     return;
   }
   this.submitted=false;
  //Add Second Parent ID
  this.addParentMenuID();
    //Add First Parent ID
    this.addParentMenuID();
    console.log(this.SelectedMenuID);
    let saveResponse: Observable<any>;
    saveResponse = this.rolePermissionService.addRolePermission(this.UserRolePermissionFormControls.UserRoleSelCode.value,this.SelectedMenuID);
    saveResponse.subscribe(
      result => {
        this.ClearContents();
        this.saveAlert.SuccessMessage();
        this.submitted = false;
        this.loading = false;
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }
  async ClearContents()
  {
    this.appMenuList= await this.rolePermissionService.getAppRoleMenu(localStorage.getItem("appID"),0)
    this.generateChild(this.appMenuList);
    this.UserRolePermissionFormControls.UserRoleSelCode.setValue('');
    $('[name="UserRoleSelCode"]').select2().trigger('change');
  }
}
