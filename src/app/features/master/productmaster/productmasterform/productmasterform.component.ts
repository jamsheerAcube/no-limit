import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonValueListService } from '../../../../core/service/commonlistvalue.service';
import { ProductMasterService } from '../../../../core/service/productmaster.service';
import { SaveAlert } from '../../../../shared/commonalerts/savealert';
import { CommonValueListModel } from '../../../../shared/model/CommonValueListModel';
import { ProductMasterModel } from '../../../../shared/model/ProductMasterModel';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'org-fat-productmasterform',
  templateUrl: './productmasterform.component.html',
  styleUrls: ['./productmasterform.component.scss']
})
export class ProductmasterformComponent implements OnInit {
  productmasterform: FormGroup;
  submitted = false;
  loading = false;
  isbtnSaveDisabled: boolean = false;
  isbtnClearDisabled: boolean = false;
  productId!: number;
  error = '';
  editMode: boolean = false;
  productData!: ProductMasterModel;
  productmastermodel: ProductMasterModel = new ProductMasterModel;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productmasterservice: ProductMasterService,
    private commonValueListService: CommonValueListService,
    private saveAlert: SaveAlert) {
    this.productmasterform = this.formBuilder.group({
      ProductCode: [null, Validators.required],
      ProductName: [null, Validators.required]
    });
  }

  async ngOnInit() {


    $('.select2bs4').select2();

    this.route.params.subscribe(params => {
      if (params['id'] != undefined) {
        this.productId = +params['id'];
        this.editMode = true;
        this.productData = this.productmasterservice.getProductMasterByKey(this.productId) as ProductMasterModel;
        this.ShowEditViewProductMaster(this.productData);

        if (params['state'] === 'view') {
          this.disableControls();
        }
      } else {
        this.editMode = false;
      }
    });
  }

  get productmasterFormControls() { return this.productmasterform.controls; }

  ShowGrid() {
    this.router.navigateByUrl('/productmaster');
  }

  disableControls() {
    this.productmasterFormControls.ProductCode.disable();
    this.productmasterFormControls.ProductName.disable();
    this.isbtnSaveDisabled = true;
    this.isbtnClearDisabled = true;
  }

  ClearContents() {
    this.productId = 0;
    this.productmasterFormControls.ProductCode.setValue('');
    this.productmasterFormControls.ProductName.setValue('');
    $('select').select2().trigger('change');
  }

  ShowEditViewProductMaster(data: ProductMasterModel) {
    // if (data) {

    //   this.productmasterFormControls.UOMSelCode.setValue(data.uomId);
    //   this.productmasterFormControls.ProductCode.setValue(data.productCode);
    //   this.productmasterFormControls.ProductName.setValue(data.productName);
    //   this.productmasterFormControls.ProductDescription.setValue(data.productDescription);
    //   //$('select').select2().trigger('change');
    //   this.productmasterFormControls.assetSubCategorySelCode.setValue(data.assetSubCategoryId);
    //   //$('select').select2().trigger('change');
    //   this.productmasterFormControls.ProductCode.disable();
    // }

  }

  SaveProductMaster() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.productmasterform.invalid) {
      return;
    }
    this.loading = true;
    let saveResponse: Observable<any>;
    this.productmastermodel = new ProductMasterModel;
    // this.productmastermodel.assetSubCategoryId = this.productmasterFormControls.assetSubCategorySelCode.value;
    // this.productmastermodel.productId = this.productId;
    // this.productmastermodel.productCode = this.productmasterFormControls.ProductCode.value;
    // this.productmastermodel.productName = this.productmasterFormControls.ProductName.value;
    // this.productmastermodel.productDescription = this.productmasterFormControls.ProductDescription.value;
    // this.productmastermodel.uomId = this.productmasterFormControls.UOMSelCode.value;

    if (this.editMode) {
      saveResponse = this.productmasterservice.editProductmaster(this.productmastermodel);
    } else {
      saveResponse = this.productmasterservice.addProductmaster(this.productmastermodel);
    }


    saveResponse.subscribe(
      result => {
        if (!this.editMode) {
         // this.productmastermodel.productId = result.productId;
          this.ClearContents();
        }
        this.saveAlert.SuccessMessage();
        this.productmasterservice.AddOrEditRecordToCache(this.productmastermodel, this.editMode);
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