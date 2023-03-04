import { Component, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { AssetAuditService } from '../../../core/service/assetaudit.service';
import { AssetVerificationService } from '../../../core/service/assetverification.service';
import { CommonValueListService } from '../../../core/service/commonlistvalue.service';
import { DepartmentmasterService } from '../../../core/service/departmentmaster.service';
import { EmployeeMasterService } from '../../../core/service/employeemaster.service';
import { LocationmasterService } from '../../../core/service/locationmaster.service';
import { ProductMasterService } from '../../../core/service/productmaster.service';
import { UserMasterService } from '../../../core/service/usermaster.service';
import { DatePipe } from '@angular/common';
import { userrolemasterservice } from 'src/app/core/service/userrolemaster.service';
import { OrganizationmasterService } from 'src/app/core/service/organizationmaster.service';
@Component({
  selector: 'org-fat-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  @Input() entity: string = '';
  @Input() selectedLocation!: number;

  isRowUnSelected: boolean = true;
  rowData: any;
  productData: any;
  columnDefs: any;
  subscription!: Subscription;
  datepipe: DatePipe = new DatePipe('en-US');
  constructor(private router: Router,
    private employeeMasterService: EmployeeMasterService,
    private commonValueListService: CommonValueListService,
    private productMasterService: ProductMasterService,
    private assetVerificationService: AssetVerificationService,
    private assetAuditService: AssetAuditService,
    private userMasterService: UserMasterService,
    private locationMasterService: LocationmasterService,
    private orgmasterservice: OrganizationmasterService,
    private departmentMasterService: DepartmentmasterService,
    private userroleMasterService: userrolemasterservice) {
    this.subscription = new Subscription;
  }
  dateAsString!: Date;



  // HELPER FOR DATE COMPARISON


  function(filterLocalDateAtMidnight: any, cellValue: any) {
    if (cellValue == null || cellValue == undefined) {
      return 0;
    }
    var dateVal = new Date(cellValue);
    if (dateVal)
      cellValue = `${dateVal.getDate().toString().padStart(2, '0')}/${(dateVal.getMonth() + 1).toString().padStart(2, '0')}/${dateVal.getFullYear()}`;
    var dateParts = cellValue.split('/');
    var year = Number(dateParts[2]);
    var month = Number(dateParts[1]) - 1;
    var day = Number(dateParts[0]) + 1;
    var cellDate = new Date(year, month, day);
    var cellDateTo = new Date(filterLocalDateAtMidnight);
    if (cellDateTo) {
      var dateto = new Date(filterLocalDateAtMidnight);
      if (dateto)
        filterLocalDateAtMidnight = `${dateto.getDate().toString().padStart(2, '0')}/${(dateto.getMonth() + 1).toString().padStart(2, '0')}/${dateto.getFullYear()}`;
      var dateParts = filterLocalDateAtMidnight.split('/');
      var year = Number(dateParts[2]);
      var month = Number(dateParts[1]) - 1;
      var day = Number(dateParts[0]);
      cellDateTo = new Date(year, month, day);
      // filterLocalDateAtMidnight=cellDateTo;
    }

    if (cellValue < filterLocalDateAtMidnight) {
      return -1;
    } else if (cellValue > filterLocalDateAtMidnight) {
      return 1;
    } else {
      return 0;
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (this.entity == "productmaster" && this.selectedLocation > 0) {
      let locationproduct = await this.productMasterService.getProductMasterbyLocationwise(this.selectedLocation);
      this.rowData = this.productData.filter((el: any) => {
        return locationproduct.some((f: any) => {
          return f.productId === el.id;
        });
      });
    }
  }


  async ngOnInit() {

    //this.agGrid.api.sizeColumnsToFit();

    switch (this.entity) {
      case 'orgmaster': {
        this.columnDefs = [
          { field: 'orgID', sortable: true, resizable: true, filter: true, checkboxSelection: false, width: 100 },
          { field: 'orgCode', sortable: true, resizable: true, filter: true },
          { field: 'orgName', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];

        this.rowData = await this.orgmasterservice.getOrganizationMaster();

        this.subscription = this.orgmasterservice.refreshClickevent.subscribe((e) => {
          console.log('refreshed');
          this.OnRefreshCick();
        });
        break;
      }
      case 'locationmaster': {
        this.columnDefs = [
          { field: 'locationID', sortable: true, resizable: true, filter: true, checkboxSelection: false, width: 100 },
          { field: 'locationCode', sortable: true, resizable: true, filter: true },
          { field: 'locationName', sortable: true, resizable: true, filter: true },
          { field: 'orgCode', sortable: true, resizable: true, filter: true },
          { field: 'orgName', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];

        this.rowData = await this.locationMasterService.getLocationMaster();

        this.subscription = this.locationMasterService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }
      case 'departmentmaster': {
        this.columnDefs = [
          { field: 'departmentID', sortable: true, resizable: true, filter: true, checkboxSelection: false, width: 100 },
          { field: 'departmentCode', sortable: true, resizable: true, filter: true },
          { field: 'departmentName', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];

        this.rowData = await this.departmentMasterService.getDepartmentMaster();

        this.subscription = this.departmentMasterService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }

      case 'employeemaster': {
        this.columnDefs = [
          { field: 'employeeId', sortable: true, resizable: true, filter: true, checkboxSelection: false, width: 100 },
          { field: 'employeeCode', sortable: true, resizable: true, filter: true },
          { field: 'firstName', sortable: true, resizable: true, filter: true },
          { field: 'lastName', sortable: true, resizable: true, filter: true },
          { field: 'designation', sortable: true, resizable: true, filter: true },
          { field: 'contactNumber', sortable: true, resizable: true, filter: true },
          { field: 'emailAddress', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];

        this.rowData = await this.employeeMasterService.getEmployeeMaster();

        this.subscription = this.employeeMasterService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }
      case 'commonvaluelistmaster': {
        this.columnDefs = [
          { field: 'listName', sortable: true, resizable: true, filter: true, checkboxSelection: false },
          { field: 'value', sortable: true, resizable: true, filter: true },
          { field: 'displayText', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];

        this.rowData = await this.commonValueListService.getCommonValueListMaster();

        this.subscription = this.commonValueListService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }

      case 'productmaster': {
        this.columnDefs = [
          { field: 'productCode', sortable: true, resizable: true, filter: true },
          { field: 'product', sortable: true, resizable: true, filter: true },
          { field: 'barcode', sortable: true, resizable: true, filter: true },
          { field: 'department', sortable: true, resizable: true, filter: true },
          { field: 'brand', sortable: true, resizable: true, filter: true },
          { field: 'size', sortable: true, resizable: true, filter: true },
          { field: 'color', sortable: true, resizable: true, filter: true },
          { field: 'lifestyle', sortable: true, resizable: true, filter: true },
          { field: 'concept', sortable: true, resizable: true, filter: true },
          { field: 'patternNo', sortable: true, resizable: true, filter: true },
          { field: 'productFeature', sortable: true, resizable: true, filter: true },
          { field: 'neck', sortable: true, resizable: true, filter: true },
          { field: 'cut', sortable: true, resizable: true, filter: true },
          { field: 'length', sortable: true, resizable: true, filter: true },
          { field: 'embelishment', sortable: true, resizable: true, filter: true },
          { field: 'sleeve', sortable: true, resizable: true, filter: true },
          { field: 'texture', sortable: true, resizable: true, filter: true },
          { field: 'material', sortable: true, resizable: true, filter: true },
          { field: 'fit', sortable: true, resizable: true, filter: true },
          { field: 'collar', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];
        this.rowData = await this.productMasterService.getProductMaster();
        this.productData = this.rowData;
        this.subscription = this.productMasterService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }


      case 'assetaudit': {
        this.columnDefs = [
          { field: 'auditID', sortable: true, resizable: true, filter: true },
          { field: 'remarks', sortable: true, resizable: true, filter: true },
          { field: 'createdBy', sortable: true, resizable: true, filter: true },
          {
            field: 'createdDate', sortable: true, resizable: true, filter: 'agDateColumnFilter',
            valueFormatter: this.dateFormatter
          },
          {
            headerName: 'Audit On', field: 'auditDate', sortable: true, resizable: true, filter: 'agDateColumnFilter',
            valueFormatter: this.dateFormatter
          },
          { field: 'auditStatusText',headerName: 'Audit Status', sortable: true, resizable: true, filter: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, resizable: true, filter: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];
        this.rowData = await this.assetAuditService.getAssetAudit();
        this.subscription = this.assetAuditService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }

      case 'usermaster': {
        this.columnDefs = [
          { field: 'userName', sortable: true, filter: true, resizable: true, checkboxSelection: false },
          // { field: 'firstName', sortable: true, filter: true, resizable: true },
          // { field: 'lastName', sortable: true, filter: true, resizable: true },
          { field: 'userRoleID', sortable: true, filter: true, resizable: true, hide: true },
          { field: 'roleName', sortable: true, filter: true, resizable: true },
          { field: 'employeeName', sortable: true, filter: true, resizable: true },
          { field: 'employeeId', sortable: true, filter: true, resizable: true, hide: true },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, filter: true, resizable: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];
        this.rowData = await this.userMasterService.getUserMaster();
        this.subscription = this.userMasterService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }
      case 'userrolemaster': {
        this.columnDefs = [
          { field: 'id', sortable: true, filter: true, resizable: true, checkboxSelection: false, width: 100, hide: true },
          { field: 'roleName', sortable: true, filter: true, resizable: true, checkboxSelection: false },
          {
            headerName: 'Is Active', field: 'isDeleted', sortable: true, filter: true, resizable: true, cellEditor: 'booleanEditor',
            cellRenderer: this.booleanCellRenderer
          }
        ];
        this.rowData = await this.userroleMasterService.getUserRoleMaster();
        this.subscription = this.userroleMasterService.refreshClickevent.subscribe((e) => {
          this.OnRefreshCick();
        });
        break;
      }
      default: {
        break;
      }
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async OnRefreshCick() {
    switch (this.entity) {
      case 'orgmaster': {
        this.rowData = await this.orgmasterservice.onRefreshOrganizationmaster();
        break;
      }
      case 'locationmaster': {
        this.rowData = await this.locationMasterService.onRefreshLocationmaster();
        break;
      }
      case 'departmentmaster': {
        this.rowData = await this.departmentMasterService.onRefreshDepartmentmaster();
        break;
      }

      case 'employeemaster': {
        this.rowData = await this.employeeMasterService.onRefreshEmployeeMaster();
        break;
      }
      case 'commonvaluelistmaster': {
        this.rowData = await this.commonValueListService.onRefreshCommonValueListmaster();
        break;
      }

      case 'productmaster': {
        this.rowData = await this.productMasterService.onRefreshProductmaster();
        this.productData = this.rowData;
        break;
      }

      case 'assetverification': {
        this.rowData = await this.assetVerificationService.onRefreshAssetVerification();
        break;
      }

      case 'assetaudit': {
        this.rowData = await this.assetAuditService.onRefreshAssetAudit();
        break;
      }

      case 'usermaster': {
        this.rowData = await this.userMasterService.onRefreshUserMaster();
        break;
      }
      case 'userrolemaster': {
        this.rowData = await this.userroleMasterService.onRefreshUserRoleMaster();
        break;
      }
      default: {
        break;
      }
    }
  }

  onRowClick(event: any) {
    switch (this.entity) {
      case 'orgmaster': {
        this.orgmasterservice.selectedrowevent.next(event);
        break;
      }
      case 'locationmaster': {
        this.locationMasterService.selectedrowevent.next(event);
        break;
      }
      case 'departmentmaster': {
        this.departmentMasterService.selectedrowevent.next(event);
        break;
      }

      case 'employeemaster': {
        this.employeeMasterService.selectedrowevent.next(event);
        break;
      }
      case 'commonvaluelistmaster': {
        this.commonValueListService.selectedrowevent.next(event);
        break;
      }

      case 'productmaster': {
        this.productMasterService.selectedrowevent.next(event);
        break;
      }

      case 'assetregister': {
        this.assetVerificationService.selectedrowevent.next(event);
        break;
      }

      case 'assetaudit': {
        this.assetAuditService.selectedrowevent.next(event);
        break;
      }

      case 'usermaster': {
        this.userMasterService.selectedrowevent.next(event);
        break;
      }
      case 'userrolemaster': {
        this.userroleMasterService.selectedrowevent.next(event);
        break;
      }
      default: {
        break;
      }
    }
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  getBooleanEditor() {
    // function to act as a class
    function BooleanEditor() { }

    // gets called once before the renderer is used
    BooleanEditor.prototype.init = function (params: any) {
      // create the cell
      var value = params.value;

      this.eInput = document.createElement('input');
      this.eInput.type = 'checkbox';
      this.eInput.checked = value;
      this.eInput.value = value;
    };

    // gets called once when grid ready to insert the element
    BooleanEditor.prototype.getGui = function () {
      return this.eInput;
    };

    // focus and select can be done after the gui is attached
    BooleanEditor.prototype.afterGuiAttached = function () {
      this.eInput.focus();
      this.eInput.select();
    };

    // returns the new value after editing
    BooleanEditor.prototype.getValue = function () {
      return this.eInput.checked;
    };

    // any cleanup we need to be done here
    BooleanEditor.prototype.destroy = function () {
      // but this example is simple, no cleanup, we could
      // even leave this method out as it's optional
    };

    // if true, then this editor will appear in a popup
    BooleanEditor.prototype.isPopup = function () {
      // and we could leave this method out also, false is the default
      return false;
    };

    return BooleanEditor;
  }

  booleanCellRenderer(params: any) {
    var value = !params.value ? 'checked' : 'unchecked';

    return '<input disabled type="checkbox" ' + value + '/>';
  }

  booleanNonTagCellRenderer(params: any) {
    var value = params.value ? 'checked' : 'unchecked';

    return '<input disabled type="checkbox" ' + value + '/>';
  }

  booleanActualCellRenderer(params: any) {
    var value = params.value ? 'checked' : 'unchecked';

    return '<input disabled type="checkbox" ' + value + '/>';
  }

  dateFormatter(params: any) {
    if (params.value) {
      var dateVal = new Date(params.value);
      if (dateVal)
        return `${dateVal.getDate().toString().padStart(2, '0')}-${(dateVal.getMonth() + 1).toString().padStart(2, '0')}-${dateVal.getFullYear()}`;
      else
        return '';
    }
    else
      return '';
    //(params: any) => { console.log(params.value);  return params.value;}
  }
  dateFormatterwithvalue(params: any) {
    if (params) {
      var dateVal = new Date(params);
      if (dateVal)
        return `${dateVal.getDate().toString().padStart(2, '0')}/${(dateVal.getMonth() + 1).toString().padStart(2, '0')}/${dateVal.getFullYear()}`;
      else
        return '';
    }
    else
      return '';
    //(params: any) => { console.log(params.value);  return params.value;}
  }
  moneyFormatter(params: any) {
    if (params.value)
      return (Math.round(params.value * 100) / 100).toFixed(2);
    else
      return '';
  }
}
