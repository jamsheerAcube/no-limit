import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonValueListService } from '../../../../core/service/commonlistvalue.service';
import { SidebarnavService } from '../../../../core/service/sidebarnav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'org-fat-commonvaluelistgrid',
  templateUrl: './commonvaluelistgrid.component.html',
  styleUrls: ['./commonvaluelistgrid.component.scss']
})
export class CommonvaluelistgridComponent implements OnInit {
  @Input() name: string = 'commonvaluelistmaster';
  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes: any;
  constructor(private router: Router,
    private commonValueListService: CommonValueListService,
    private sidebarnavservice: SidebarnavService) {
    this.isCreateAllowed = localStorage.getItem("isCreateAllowed") == "true";
    this.isEditAllowed = localStorage.getItem("isEditAllowed") == "true";
    this.isViewAllowed = localStorage.getItem("isViewAllowed") == "true";
    this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") == "true";

  }

  async ngOnInit() {
    this.subscription = this.commonValueListService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/valuelist/add');
  }

  OnRefreshCick() {
    this.isRowUnSelected = true;
    this.commonValueListService.refreshClickevent.next();
  }

  OnEditClick() {
    this.router.navigateByUrl('/valuelist/edit/' + this.selectedNodes.value);
  }

  OnViewClick() {
    this.router.navigateByUrl('/valuelist/view/' + this.selectedNodes.value);
  }

}
