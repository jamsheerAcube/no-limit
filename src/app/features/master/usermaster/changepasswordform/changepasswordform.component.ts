import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/core/login/login.component';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { UserMasterService } from 'src/app/core/service/usermaster.service';
import { SaveAlert } from 'src/app/shared/commonalerts/savealert';
import { ChangePasswordModel } from 'src/app/shared/model/ChangePasswordModel';

@Component({
  selector: 'app-changepasswordform',
  templateUrl: './changepasswordform.component.html',
  styleUrls: ['./changepasswordform.component.css']
})
export class ChangepasswordformComponent implements OnInit {
  userName!:any;
  PasswordChangeForm: FormGroup;
  submitted: boolean = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  UserName!: string;
  error = '';
  editMode: boolean = false;
  isMismatch:boolean=false;
  isMismatchforButton:boolean=false;
  changePasswordModel!:ChangePasswordModel;;
  constructor(private formBuilder: FormBuilder,private router: Router,
    private route: ActivatedRoute,
    private saveAlert: SaveAlert,
    private userMasterService: UserMasterService,private authservice:AuthenticationService) { 
      this.PasswordChangeForm = this.formBuilder.group({
        OldPassword: ['', Validators.required],
        NewPassword: ['', Validators.required],
        RepeatPassword: ['', Validators.required]
      });
    }

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');

  }
  get PasswordChangeFormControls() { return this.PasswordChangeForm.controls; }

  ShowGrid()
  {
    this.router.navigateByUrl('/dashboard');
  }

  ClearContents()
  {

  }

  UpdatePassword()
  {
    this.error=''
    this.submitted=true;
    this.isMismatch=false;
    if(this.PasswordChangeForm.invalid)
    {
      return
    }
    this.submitted=false;
    if(this.PasswordChangeFormControls.OldPassword.value==this.PasswordChangeFormControls.NewPassword.value)
    {
      this.error='Old and new password cannot be same';
      return;
    }
    if(this.PasswordChangeFormControls.NewPassword.value!=this.PasswordChangeFormControls.RepeatPassword.value)
    {
      this.error='Password not matching';
      return;
    }

    let saveResponse: Observable<any>;
    this.changePasswordModel=new ChangePasswordModel;
    this.changePasswordModel.userName = localStorage.getItem('userName');
    this.changePasswordModel.oldPassword = this.PasswordChangeFormControls.OldPassword.value;
    this.changePasswordModel.newPassword =  this.PasswordChangeFormControls.NewPassword.value;
    this.changePasswordModel.companyID =  localStorage.getItem('companyID');
    saveResponse = this.userMasterService.updatePassword(this.changePasswordModel);
    saveResponse.subscribe(
      result => {
        //this.saveAlert.SuccessMessage();
        this.submitted = false;
        
        this.loading = false;
        //this.authservice.logout('Password successfully changed! Please login with new password');
      },
      err => {
        this.error = err.error ? err.error : err.message;
        this.loading = false;
      }
    );
  }
  checkpassword(event:any)
  {
    if(event.target.value!='')
    {
    if(this.PasswordChangeFormControls.NewPassword.value==this.PasswordChangeFormControls.RepeatPassword.value)
    {
     this.isMismatchforButton=true;
    }
    else
    {
      this.isMismatchforButton=false;
    }
    }
  }

}
