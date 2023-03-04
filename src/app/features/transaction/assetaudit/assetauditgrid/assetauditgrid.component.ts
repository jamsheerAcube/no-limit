import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetAuditService } from '../../../../core/service/assetaudit.service';
import { Subscription } from 'rxjs';
import { InactivateAlert } from 'src/app/shared/commonalerts/inactivatealert';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'org-fat-assetauditgrid',
  templateUrl: './assetauditgrid.component.html',
  styleUrls: ['./assetauditgrid.component.scss']
})
export class AssetauditgridComponent implements OnInit {
  @Input() name: string = 'assetaudit';

  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;
  isVerifyAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  subscription1!: Subscription;
  selectedNodes: any;
  isAuditApproved=false;
  isAuditClosed=false;
  loading=false;
  constructor(private router: Router,
    private assetAuditServe: AssetAuditService, private inactivateAlert: InactivateAlert,private datepipe:DatePipe) {
    this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
    this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
    this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
    this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";
    this.isVerifyAllowed = localStorage.getItem("isVerifyAllowed") == "true";
  }

  async ngOnInit() {

    this.subscription = this.assetAuditServe.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
      // this.isAuditApproved = e.data.auditStatus !=30;
      // this.isAuditClosed=e.data.auditStatus >40;
    });

    this.subscription1 = this.inactivateAlert.Clickevent.subscribe((e) => {
      this.loading=false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/physicalcount/add');
  }

  OnRefreshCick() {
    this.isRowUnSelected = true;
    this.isRowUnSelected = true;
    this.assetAuditServe.refreshClickevent.next();
  }

  OnCloseClick()
  {
    this.inactivateAlert.CloseConfirmBox(
      this.selectedNodes.auditID,
      this.name
    );
  }

  OnReleasedClick()
  {
    this.loading=true;
    this.inactivateAlert.ReleaseConfirmBox(
      this.selectedNodes.auditID,
      "auditrelease"
    );
  }

  OnEditClick() {
    this.router.navigate(['physicalcount/edit', this.selectedNodes.auditID]);
    //this.router.navigateByUrl('' + );
  }

  OnAssetSummaryClickClick()
  {
    this.router.navigate(['physicalcount/assetsummary', this.selectedNodes.auditID]);
  }
  OnAuditVarianceClick()
  {
    this.router.navigate(['physicalcount/auditvariance', this.selectedNodes.auditID]);
  }
  OnViewClick() {
    this.router.navigate(['physicalcount/view', this.selectedNodes.auditID]);
  }

  OnVerifyClick() {
    this.router.navigate(['auditdiscrepancy'], { queryParams: { auditNo: this.selectedNodes.auditID  } });
  }


}
