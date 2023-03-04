import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductMasterService } from '../../../../core/service/productmaster.service';
import { InactivateAlert } from '../../../../shared/commonalerts/inactivatealert';
import { LocationmasterService } from '../../../../core/service/locationmaster.service';
import { Subscription } from 'rxjs';
declare var $: any;
@Component({
  selector: 'org-fat-productmastergrid',
  templateUrl: './productmastergrid.component.html',
  styleUrls: ['./productmastergrid.component.scss']
})
export class ProductmastergridComponent implements OnInit {
  @Input() name: string = 'productmaster';
  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;
  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes: any;
  rowData: any;
  Locations: any[] = []
  selectedLocation: number = 0;

  constructor(private router: Router,
    private productMasterService: ProductMasterService,
    private locationService: LocationmasterService,
    private inactivateAlert: InactivateAlert) {
    // this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
    // this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
    // this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
    // this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";
  }

  async ngOnInit() {
    this.subscription = this.productMasterService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
    $('.select2bs4').select2();
    $('[name="LocationsCode"]').on("change", () => {
      this.selectedLocation = Number($('[name="LocationsCode"]').val());
    });
    this.Locations = await this.locationService.getLocationMaster(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {

  }

  btnNewClick() {
    this.router.navigateByUrl('/productmaster/add');
  }

  OnRefreshCick() {
    this.isRowUnSelected = true;
    this.selectedLocation = 0;
    $('[name="LocationsCode"]').val(null)
    $('.select2bs4').select2();
    this.productMasterService.refreshClickevent.next();
  }

  OnEditClick() {
    this.router.navigateByUrl('/productmaster/edit/' + this.selectedNodes.itemID);
  }

  OnViewClick() {
    this.router.navigateByUrl('/productmaster/view/' + this.selectedNodes.itemID);
  }

  OnDeleteClick() {
    this.inactivateAlert.InactivateConfirmBox(this.selectedNodes.itemID, this.name);
  }

}
