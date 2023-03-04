import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganizationmasterService } from 'src/app/core/service/organizationmaster.service';
import { InactivateAlert } from 'src/app/shared/commonalerts/inactivatealert';

@Component({
  selector: 'org-fat-orgmastergrid',
  templateUrl: './orgmastergrid.component.html',
  styleUrls: ['./orgmastergrid.component.css']
})
export class OrgmastergridComponent implements OnInit {
  @Input() name: string = 'orgmaster';

  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes: any;
  constructor(private router: Router,
    private orgmasterService: OrganizationmasterService,
    private inactivateAlert: InactivateAlert) { 
      // this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
      // this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
      // this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
      // this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";
    }

  ngOnInit(): void {
    this.subscription = this.orgmasterService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/orgmaster/add');
  };

  async OnRefreshCick() {
    this.isRowUnSelected = true;
    this.orgmasterService.refreshClickevent.next();
  }

  OnEditClick() {
    this.router.navigateByUrl('/orgmaster/edit/' + this.selectedNodes.orgID);
  }

  OnViewClick() {
    this.router.navigateByUrl('/orgmaster/view/' + this.selectedNodes.orgID);
  }

  OnDeleteClick() {
    this.inactivateAlert.InactivateConfirmBox(this.selectedNodes.orgID, this.name);
  }

}
