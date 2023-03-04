import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
declare var $: any;

@Component({
  selector: 'org-fat-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bodyText!: string;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    //this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
