import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserMasterService } from 'src/app/core/service/usermaster.service';
import { InactivateAlert } from 'src/app/shared/commonalerts/inactivatealert';

@Component({
  selector: 'app-usermastergrid',
  templateUrl: './usermastergrid.component.html',
  styleUrls: ['./usermastergrid.component.css']
})
export class UsermastergridComponent implements OnInit {
  @Input() name:string='usermaster';
  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes:  any;
  constructor(private router: Router,
    private usermasterService: UserMasterService,
    private inactivateAlert: InactivateAlert) { 
      this.isCreateAllowed = localStorage.getItem("isCreateAllowed") =="true";
      this.isEditAllowed = localStorage.getItem("isEditAllowed") =="true";
      this.isViewAllowed = localStorage.getItem("isViewAllowed") =="true";
      this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") =="true";
    }

  ngOnInit(): void {
    this.subscription=this.usermasterService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
    console.log(this.isEditAllowed);
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/usermaster/add');
  }

  OnRefreshCick(){
    this.isRowUnSelected = true;
    this.usermasterService.refreshClickevent.next();
  }

  OnEditClick(){
      this.router.navigateByUrl('/usermaster/edit/' + this.selectedNodes.userName);
  }

  OnViewClick(){
    this.router.navigateByUrl('/usermaster/view/' + this.selectedNodes.userName);
}

OnDeleteClick() {
  this.inactivateAlert.InactivateConfirmBox(this.selectedNodes.userName, "usermaster");
}

}
