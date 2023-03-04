import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentmasterService } from '../../../../core/service/departmentmaster.service';
import { DownloadService } from '../../../../core/service/download.service';
import { EmployeeMasterService } from '../../../../core/service/employeemaster.service';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { DepartmentMasterModel } from '../../../../shared/model/DepartmentMasterModel';
import { EmployeeMasterModel } from '../../../../shared/model/EmployeeMasterModel';
import { Observable } from 'rxjs';
declare var $: any;

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'org-fat-employeeMasterForm',
  templateUrl: './employeeMasterForm.component.html',
  styleUrls: ['./employeeMasterForm.component.scss']
})
export class EmployeemasterformComponent implements OnInit {
  @ViewChild('Image', { static: false })
  Image!: ElementRef;
  employeeMasterForm: FormGroup;
  submitted = false;
  departmentCodes: DepartmentMasterModel[] = [];
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  employeeId: number = 0;
  error = '';
  fileList!: FileList;
  editMode: boolean = false;
  employeeData!: EmployeeMasterModel;
  employeemastermodel: EmployeeMasterModel = new EmployeeMasterModel;
  selectedFile!: ImageSnippet;
  imageError!: string;
  isImageSaved!: boolean;
  cardImageBase64!: string;
  imageId!: string;
  previewImage!: SafeStyle;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeMasterService: EmployeeMasterService,
    private departmentMasterService: DepartmentmasterService,
    private saveAlert: SaveAlert,
    private downloadService: DownloadService,
    private sanitizer: DomSanitizer) {
    this.employeeMasterForm = this.formBuilder.group({
      departmentSelCode: [null, Validators.required],
      EmployeeCode: [null, Validators.required],
      FirstName: [null, Validators.required],
      LastName: [null],
      Designation: [null, Validators.required],
      ContactNumber: [null],
      EmailAddress: [null, Validators.required],
      Image: []
    });
  }

  async ngOnInit() {
    $('.select2bs4').select2();
    $('[name="departmentSelCode"]').on("change", () => {
      this.employeeMasterFormControls.departmentSelCode.setValue($('[name="departmentSelCode"]').val());
    });
    this.departmentCodes = await this.departmentMasterService.getDepartmentMaster();
    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.employeeId = +params['id'];
        this.editMode = true;
        this.employeeData = this.employeeMasterService.getEmployeeMasterByKey(this.employeeId) as EmployeeMasterModel;
        this.ShowEditViewEmployeeMaster(this.employeeData);

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }

  get employeeMasterFormControls() { return this.employeeMasterForm.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/employeemaster');
  }

  disableControls() {
    this.employeeMasterFormControls.departmentSelCode.disable();
    this.employeeMasterFormControls.EmployeeCode.disable();
    this.employeeMasterFormControls.FirstName.disable();
    this.employeeMasterFormControls.LastName.disable();
    this.employeeMasterFormControls.Designation.disable();
    this.employeeMasterFormControls.ContactNumber.disable();
    this.employeeMasterFormControls.EmailAddress.disable();
    //this.employeeMasterFormControls.EmployeeImage.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.employeeId = 0;
    this.employeeMasterFormControls.departmentSelCode.setValue('');
    this.employeeMasterFormControls.EmployeeCode.setValue('');
    this.employeeMasterFormControls.FirstName.setValue('');
    this.employeeMasterFormControls.LastName.setValue('');
    this.employeeMasterFormControls.Designation.setValue('');
    this.employeeMasterFormControls.ContactNumber.setValue('');
    this.employeeMasterFormControls.EmailAddress.setValue('');
    $('select').select2().trigger('change');
    //this.Image.nativeElement.value = '';
    this.cardImageBase64 = '';
    this.isImageSaved = false;

  }

  ImageDisplay() {
    var imageExtension = this.imageId.substr(this.imageId.lastIndexOf('.') + 1);
    this.downloadService.DownloadFile(this.imageId).subscribe((data: any) => {
      let blob = new Blob([data], { type: 'image/' + imageExtension });
      let objectURL = window.URL.createObjectURL(blob);      
      this.previewImage = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);      
    });
  }
  ShowEditViewEmployeeMaster(data: EmployeeMasterModel) {
    this.employeeMasterFormControls.departmentSelCode.setValue(data.departmentId);
    this.employeeMasterFormControls.EmployeeCode.setValue(data.employeeCode);
    this.employeeMasterFormControls.FirstName.setValue(data.firstName);
    this.employeeMasterFormControls.LastName.setValue(data.lastName);
    this.employeeMasterFormControls.Designation.setValue(data.designation);
    this.employeeMasterFormControls.ContactNumber.setValue(data.contactNumber);
    this.employeeMasterFormControls.EmailAddress.setValue(data.emailAddress);
    //this.cardImageBase64 = atob(data.image);
   // this.isImageSaved = true;
    this.employeeMasterFormControls.EmployeeCode.disable();
    // if(this.imageId)
    //   this.ImageDisplay();
  }

  SaveEmployeeMaster() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.employeeMasterForm.invalid) {
      return;
    }
    this.loading = true;
    let saveResponse: Observable<any>;
    
    const formData = new FormData();
    formData.append('employeeId', this.employeeId.toString());
    formData.append('employeeCode', this.employeeMasterFormControls.EmployeeCode.value);
    formData.append('firstName', this.employeeMasterFormControls.FirstName.value);
    formData.append('lastName', this.employeeMasterFormControls.LastName.value);
    formData.append('designation', this.employeeMasterFormControls.Designation.value);
    formData.append('departmentID', this.employeeMasterFormControls.departmentSelCode.value);
    formData.append('emailAddress', this.employeeMasterFormControls.EmailAddress.value);
    formData.append('contactNumber', this.employeeMasterFormControls.ContactNumber.value);

    // if (this.fileList != null && this.fileList.length > 0) {
    //   let file: File = this.fileList[0];
    //   formData.append('Photo', file, file.name);
    // }

    this.employeemastermodel = new EmployeeMasterModel;
    this.employeemastermodel.departmentId = this.employeeMasterFormControls.departmentSelCode.value;
    this.employeemastermodel.employeeId = this.employeeId;
    this.employeemastermodel.employeeCode = this.employeeMasterFormControls.EmployeeCode.value;
    this.employeemastermodel.firstName = this.employeeMasterFormControls.FirstName.value;
    this.employeemastermodel.lastName = this.employeeMasterFormControls.LastName.value;
    this.employeemastermodel.designation = this.employeeMasterFormControls.Designation.value;
    this.employeemastermodel.contactNumber = this.employeeMasterFormControls.ContactNumber.value;
    this.employeemastermodel.emailAddress = this.employeeMasterFormControls.EmailAddress.value;
    //this.employeemastermodel.image = btoa(this.cardImageBase64);
    const currentDepartment = this.departmentCodes.filter(item => item.departmentID == this.employeemastermodel.departmentId)[0];
    this.employeemastermodel.departmentCode = currentDepartment.departmentCode;
    this.employeemastermodel.departmentName = currentDepartment.departmentName;



    if (this.editMode) {
      saveResponse = this.employeeMasterService.editEmployeemaster(formData, this.employeeId);
    } else {
      saveResponse = this.employeeMasterService.addEmployeemaster(formData);
    }


    saveResponse.subscribe(
      result => {
        if (!this.editMode) {
          this.employeemastermodel.employeeId = result.employeeId;
          this.ClearContents();
        }
        this.saveAlert.SuccessMessage();
        this.employeeMasterService.AddOrEditRecordToCache(this.employeemastermodel, this.editMode);
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

  fileChange(event: any) {
    this.fileList = event.target.files;
  }

}

