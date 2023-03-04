import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'org-fat-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  loginForm: FormGroup;
  loading = false;
  error=null;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {      
      this.loginForm = this.formBuilder.group({
        userName: [null, Validators.required],
        password: [null, Validators.required],
      });
  }

  ngOnInit(): void {
    this.authenticationService.resetLogin();
  }

  get loginFormControls() { return this.loginForm.controls; }

  onSubmit() { 
    this.loginForm.get('userName')?.setValue('admin@acubeinfotech.ae');
    this.loginForm.get('password')?.setValue('Admin@123');
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.loginForm.value).subscribe(
      () => {        
        //this.router.navigate(['/home']);
        this.router.navigate(['/dashboardlink']);
      },
      err => {        
        this.error = err.error ? err.error.message : err.message;
        console.log(this.error);
        this.loading = false;
      }
    );
  }
}


