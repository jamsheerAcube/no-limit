import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationmasterService } from '../../../../core/service/locationmaster.service';
import { InactivateAlert } from '../../../../shared/commonalerts/inactivatealert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'org-fat-locationmastergrid',
  templateUrl: './locationmastergrid.component.html',
  styleUrls: ['./locationmastergrid.component.scss']
})
export class LocationmastergridComponent implements OnInit {
  @Input() name: string = 'locationmaster';

  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes: any;

  constructor(private router: Router,
    private locationmasterService: LocationmasterService,
    private inactivateAlert: InactivateAlert) {
    // this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
    // this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
    // this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
    // this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";
  }

  ngOnInit() {
    this.subscription = this.locationmasterService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/locationmaster/add');
  };

  async OnRefreshCick() {
    this.isRowUnSelected = true;
    this.locationmasterService.refreshClickevent.next();
  }

  OnEditClick() {
    this.router.navigateByUrl('/locationmaster/edit/' + this.selectedNodes.locationID);
  }

  OnViewClick() {
    this.router.navigateByUrl('/locationmaster/view/' + this.selectedNodes.locationID);
  }

  OnDeleteClick() {
    this.inactivateAlert.InactivateConfirmBox(this.selectedNodes.locationID, this.name);
  }
}
