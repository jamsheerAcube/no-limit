import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarnavService } from 'src/app/core/service/sidebarnav.service';
import { userrolemasterservice } from 'src/app/core/service/userrolemaster.service';
import { InactivateAlert } from 'src/app/shared/commonalerts/inactivatealert';

@Component({
  selector: 'app-userrolemastergrid',
  templateUrl: './userrolemastergrid.component.html',
  styleUrls: ['./userrolemastergrid.component.css']
})
export class UserrolemastergridComponent implements OnInit {
  @Input() name:string='userrolemaster';
  isCreateAllowed: boolean = false;
  isEditAllowed: boolean = false;
  isViewAllowed: boolean = false;
  isDeleteAllowed: boolean = false;

  isRowUnSelected: boolean = true;
  subscription!: Subscription;
  selectedNodes:  any;
  constructor(private router: Router,
    private userrolemasterService: userrolemasterservice,
    private inactivateAlert: InactivateAlert) { 
      this.isCreateAllowed = localStorage.getItem("isCreateAllowed") =="true";
      this.isEditAllowed = localStorage.getItem("isEditAllowed") =="true";
      this.isViewAllowed = localStorage.getItem("isViewAllowed") =="true";
      this.isDeleteAllowed = localStorage.getItem("isDeleteAllowed") =="true";
    }

  async ngOnInit() {
    this.subscription=this.userrolemasterService.selectedrowevent.subscribe((e) => {
      this.isRowUnSelected = false;
      this.selectedNodes = e.data;
    });
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  btnNewClick() {
    this.router.navigateByUrl('/userrolemaster/add');
  }

  OnRefreshCick(){
    this.isRowUnSelected = true;
    this.userrolemasterService.refreshClickevent.next();
  }

  OnEditClick(){
      this.router.navigateByUrl('/userrolemaster/edit/' + this.selectedNodes.id);
  }

  OnViewClick(){
    this.router.navigateByUrl('/userrolemaster/view/' + this.selectedNodes.id);
}

OnDeleteClick() {
  this.inactivateAlert.InactivateConfirmBox(this.selectedNodes.id, "userrolemaster");
}

}
