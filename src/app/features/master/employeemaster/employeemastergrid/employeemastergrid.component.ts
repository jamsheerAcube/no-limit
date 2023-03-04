import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeMasterService } from '../../../../core/service/employeemaster.service';
import { InactivateAlert } from '../../../../shared/commonalerts/inactivatealert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'org-fat-employeemastergrid',
  templateUrl: './employeemastergrid.component.html',
  styleUrls: ['./employeemastergrid.component.scss']
})
export class EmployeemastergridComponent implements OnInit {
  @Input() name: string = 'employeemaster';

  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes: any;

  constructor(private router: Router,
    private employeeMasterService: EmployeeMasterService,
    private inactivateAlert: InactivateAlert) {
    this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
    this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
    this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
    this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";
  }

  async ngOnInit() {

    this.subscription = this.employeeMasterService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/employeemaster/add');
  }

  OnRefreshCick() {
    this.isRowUnSelected = true;
    this.employeeMasterService.refreshClickevent.next();
  }

  OnEditClick() {
    this.router.navigateByUrl('/employeemaster/edit/' + this.selectedNodes.employeeId);
  }

  OnViewClick() {
    this.router.navigateByUrl('/employeemaster/view/' + this.selectedNodes.employeeId);
  }

  OnDeleteClick() {
    this.inactivateAlert.InactivateConfirmBox(this.selectedNodes.employeeId, this.name);
  }
}

