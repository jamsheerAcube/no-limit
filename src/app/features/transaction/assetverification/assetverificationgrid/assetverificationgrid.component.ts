import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetVerificationService } from '../../../../core/service/assetverification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'org-fat-assetverificationgrid',
  templateUrl: './assetverificationgrid.component.html',
  styleUrls: ['./assetverificationgrid.component.scss']
})
export class AssetverificationgridComponent implements OnInit {
  @Input() name: string = 'assetverification';

  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes: any;

  constructor(private router: Router,
    private assetVerificationService: AssetVerificationService) {
    this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
    this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
    this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
    this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";
  }

  async ngOnInit() {

    this.subscription = this.assetVerificationService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/assetverification/add');
  }

  OnRefreshCick() {
    this.isRowUnSelected = true;
    this.assetVerificationService.refreshClickevent.next();
  }

  OnEditClick() {
    this.router.navigate(['assetverification/edit', this.selectedNodes.receiptId]);
    //this.router.navigateByUrl('' + );
  }

  OnViewClick() {
    this.router.navigate(['receipt/view', this.selectedNodes.receiptId]);
    //this.router.navigateByUrl('/receipt/view/' + this.selectedNodes.receiptId);
  }


}

