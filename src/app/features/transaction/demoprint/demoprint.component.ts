import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { Observable } from 'rxjs';
import { demoprintService } from 'src/app/core/service/demoprint.service';
import { LocationmasterService } from 'src/app/core/service/locationmaster.service';
import { OrganizationmasterService } from 'src/app/core/service/organizationmaster.service';
import { PrintLabelService } from 'src/app/core/service/printlabel.service';
import { ProductMasterService } from 'src/app/core/service/productmaster.service';
import { ReportsService } from 'src/app/core/service/reports.service';
import { UserMasterService } from 'src/app/core/service/usermaster.service';
import { DemoPrintModel, prinrFilter } from 'src/app/shared/model/DemoPrintModel';
declare var $: any;

@Component({
  selector: 'org-fat-demoprint',
  templateUrl: './demoprint.component.html',
  styleUrls: ['./demoprint.component.css']
})
export class DemoprintComponent implements OnInit {
  rowClassRules!: any;
  selectedorganizationList!: any;
  selectedLocationList: any[] = [];
  selectedItemList: any[] = [];
  selectedBatchList: any[] = [];
  organizationList: any[] = [];
  locationList: any[] = [];
  itemList: any[] = [];
  batchList: any[] = [];
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  DemoTagPrintForm: FormGroup;
  isRowSelected: boolean = false;
  isSubmitted: boolean = false;
  columnPrintDefs: any;
  printSaleError = '';
  submitted: boolean = false;
  printLabelDesignCodes!: string[];
  printList!: DemoPrintModel[];

  selectedRowCount: number = 0;
  selectedQty: number = 0;


  constructor(public datepipe: DatePipe, private formBuilder: FormBuilder, private printLabelService: PrintLabelService,
    private demoPrintService: demoprintService, private organizationService: OrganizationmasterService,
    private reportService: ReportsService,
    private locationService: LocationmasterService, private itemService: ProductMasterService, private userService: UserMasterService) {
    this.DemoTagPrintForm = this.formBuilder.group({
      PrintTemplateSelCode: [null, Validators.required],
      OrganizationSelCode: [null],
      LocationSelCode: [null],
      ItemSelCode: [null],
      BatchSelCode: [null],
      FromDate: [null],
      ToDate: [null],
      PrintQtyFilter: [null]
    });
  }

  async ngOnInit() {
    this.DemoTagPrintFormControls.PrintQtyFilter.setValue('less than');
    this.rowClassRules = {
      'print-color-change': function (params: any) {
        return (params.data.prinT_QTY > 0 && params.data.transactioN_QUANTITY == params.data.prinT_QTY);
      },
      'print-qty-exceeded-color-change': function (params: any) {
        return (params.data.prinT_QTY > 0 && params.data.prinT_QTY > params.data.transactioN_QUANTITY)
      },
      'print-qty-partial-color-change': function (params: any) {
        return (params.data.prinT_QTY > 0 && params.data.prinT_QTY < params.data.transactioN_QUANTITY)
      },
      'print-qty-zero-color-change': function (params: any) {
        return params.data.printingQty == 0
      }
    };

    this.printList = [];
    $('.select2bs4').select2();
    $('[name="PrintTemplateSelCode"]').on("change", () => {
      this.DemoTagPrintFormControls.PrintTemplateSelCode.setValue($('[name="PrintTemplateSelCode"]').val());
    });
    this.columnPrintDefs = [
      {
        headerName: 'TRANSACTION ID', field: 'transactioN_ID', width: 200, sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      { field: 'iteM_ID', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, hide: true },
      { field: 'orG_ID', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, hide: true },
      { field: 'loC_ID', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, hide: true },
      { headerName: 'ITEM CODE', field: 'itemCode', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, },
      { headerName: 'ITEM NAME', field: 'itemName', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, },
      { headerName: 'LOT NUMBER', field: 'loT_NUMBER', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, width: 170 },
      { headerName: 'TRANSACTION QTY', field: 'transactioN_QUANTITY', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, width: 180 },
      { headerName: 'PRINTED QTY', field: 'prinT_QTY', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, width: 150 },
      { headerName: 'PRINTING QTY', field: 'printingQty', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: true, width: 160 },
      {
        headerName: 'EXPIRATION DATE', field: 'expiratioN_DATE', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false,
        valueFormatter: this.dateFormatter
      },
      {
        headerName: 'TRANSACTION DATE', field: 'transactioN_DATE', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false,
        valueFormatter: this.dateFormatter
      },
      { headerName: 'ORG CODE', field: 'orgCode', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, },
      { headerName: 'ORG NAME', field: 'orgName', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, },
      { headerName: 'SUB INV CODE', field: 'locationCode', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, },
      { headerName: 'SUB INV DES', field: 'locationName', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, },
      { headerName: 'SUPPLIER LOT', field: 'supplieR_LOT_NUMBER', sortable: true, filter: true, resizable: true, singleClickEdit: true, editable: false, }
    ];
    await this.loadOrganization(true);
    await this.loadItem(true);
    this.printLabelDesignCodes = await this.printLabelService.getPrintLabelDesign();

  }



  async loadOrganization(forceRefresh: boolean = false) {
    var orgList = await this.organizationService.getOrganizationMaster(forceRefresh);
    var temporgList = orgList.map(p => { return { orgName: p.orgCode + ' - ' + p.orgName, orgID: p.orgID } });
    await this.userService.getUserMaster(true);
    var UserDetails = this.userService.getUserMasterByKey(localStorage.getItem('userName'));
    let userOrgIDList = UserDetails?.userOrgMapping.map(item => { return item.orgID; });
    this.organizationList = temporgList.filter(p => userOrgIDList?.includes(p.orgID));
  }

  async loadItem(forceRefresh: boolean = false) {
    var tempItemList = await this.itemService.getProductMaster(forceRefresh);
    let ItemMap = tempItemList.map(p => { return { itemName: p.itemCode + ' - ' + p.itemName, itemID: p.itemID, uomCode: p.uomCode } })
    this.itemList = ItemMap;
  }

  async onOrganizationChange(event: string) {
    console.log(event);
    console.log(this.selectedorganizationList);
    if (event != null) {
      var locationMaster = await this.locationService.getLocationMaster(true);
      console.log(locationMaster);
      let locationInSelectedOrganization = locationMaster.filter(p => p.orgID == this.selectedorganizationList);
      var locationMap = locationInSelectedOrganization.map(p => { return { locationName: p.locationCode + ' - ' + p.locationName, locationID: p.locationID, orgID: p.orgID } })
      this.locationList = locationMap;
    }
  }

  onOrganizationClear() {
    this.locationList = [];
    this.selectedLocationList = [];
  }

  onItemClear() {
    this.batchList = [];
    this.selectedBatchList = [];
  }

  async onItemRemove(event: string[]) {
    await this.loadbatch(event);
  }

  async onItemChange(event: string[]) {
    await this.loadbatch(event);
  }
  async loadbatch(event: string[]) {
    console.log(event);
    console.log(this.selectedItemList);
    var _printFilter: prinrFilter = new prinrFilter;
    if (event.length > 0) {
      _printFilter.itemIds = this.selectedItemList;
      this.batchList = await this.reportService.getBatchList(_printFilter);
      console.log(this.batchList);
    }
    else {
      this.batchList = [];
      this.selectedBatchList = [];
    }
  }

  RefreshFilter() {
    this.organizationList = [];
    this.selectedorganizationList = null;
    this.locationList = [];
    this.selectedLocationList = [];
    this.itemList = [];
    this.selectedItemList = [];
    this.batchList = [];
    this.selectedBatchList = [];
    this.printList = [];
    this.loadOrganization();
    this.loadItem();
  }

  async LoadPrintData() {
    var _printFilter: prinrFilter = new prinrFilter;
    _printFilter.toDate = this.DemoTagPrintFormControls.ToDate.value;
    _printFilter.fromDate = this.DemoTagPrintFormControls.FromDate.value;
    _printFilter.printQtyFilter = this.DemoTagPrintFormControls.PrintQtyFilter.value;
    _printFilter.orgIds = this.selectedorganizationList;
    _printFilter.locIds = this.selectedLocationList;
    _printFilter.itemIds = this.selectedItemList;
    _printFilter.batches = this.selectedBatchList;
    this.printList = await this.demoPrintService.getDataForPrint(_printFilter);
    console.log(this.printList);

    this.selectedRowCount=0;
    this.selectedQty=0;
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
  get DemoTagPrintFormControls() { return this.DemoTagPrintForm.controls; }
  onPrintRowClick(event: any) {
    this.isRowSelected = true;
  }
  onSelectionChanged(event: any) {
    this.isRowSelected = true;
    let selectedNodes = this.agGrid.api.getSelectedNodes();
    let selectedData = selectedNodes.map<DemoPrintModel>(node => node.data);

    this.selectedRowCount=selectedNodes?.length??0;

    this.selectedQty=0;
    selectedData.forEach(x=>{
      this.selectedQty+= +(x.transactioN_QUANTITY??0);
    });
  }
  toHexString(byteArray: any) {
    return Array.from(byteArray, function (byte: any) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
  error = '';
  PrintedData: DemoPrintModel[] = [];
  loading = false;
  async PrintTag() {
    this.error = '';
    this.submitted = true;

    if (this.DemoTagPrintForm.invalid) {
      return;
    }

    var SelectedTemplateContent = '';
    this.submitted = false;
    let selectedNodes = this.agGrid.api.getSelectedNodes();
    let selectedData = selectedNodes.map<DemoPrintModel>(node => node.data);
    if (selectedData.length <= 0) {
      this.error = 'Please select atleast one row';
      return;
    }
    this.loading = true;
    var printZPL = '';
    var finalZPL = '';
    var notValid = true;
    var qtyExceeded = false;
    var designContent = await this.printLabelService.getPrintLabelDesignData(this.DemoTagPrintFormControls.PrintTemplateSelCode.value);
    designContent = designContent.replace(/\r?\n|\r/g, "</br>");
    this.PrintedData = [];
    selectedData.forEach(element => {
      // if (element.printqty > 0) {
      //   if (element.printqty > element.qty) {
      //     this.error = 'Print quantity is exceeded with actual quantity! item code: ' + element.itemCode + ' & Internal LOT: ' + element.internaL_LOT;
      //     this.loading=false;
      //     notValid=true;
      //     return;
      //   }
      // }
      if (element.printingQty > 0) {
        if (element.printingQty > element.transactioN_QUANTITY) {
          this.error = 'Printing qty entered is greater than transaction qty! Transaction ID:' + element.transactioN_ID;
          this.loading = false;
          qtyExceeded = true;
          return;
        }
        var printModelObj: DemoPrintModel = new DemoPrintModel;
        printModelObj.loT_NUMBER = element.loT_NUMBER;
        printModelObj.printingQty = element.printingQty;
        printModelObj.iteM_ID = element.iteM_ID;
        printModelObj.itemCode = element.itemCode;
        printModelObj.itemName = element.itemName;
        printModelObj.locationCode = element.locationCode;
        printModelObj.orgCode = element.orgCode;
        printModelObj.iteM_ID = element.iteM_ID;
        printModelObj.loC_ID = element.loC_ID;
        printModelObj.transactioN_ID = element.transactioN_ID;
        printModelObj.orG_ID = element.orG_ID;
        console.log(element.expiratioN_DATE);
        var exp_date: any = this.datepipe.transform(element.expiratioN_DATE, 'yyyy-MM-dd');
        printModelObj.expiratioN_DATE = exp_date;
        printModelObj.supplieR_LOT_NUMBER = element.supplieR_LOT_NUMBER;
        this.PrintedData.push(printModelObj);
        notValid = false;
      }

    });
    if (qtyExceeded) {
      return;
    }
    if (notValid) {
      this.error = 'Printing qty not entered';
      this.loading = false;
      return;
    }
    console.log(this.PrintedData);
    let saveResponse: Observable<any>;
    saveResponse = this.demoPrintService.addSerialNo(this.PrintedData);
    saveResponse.subscribe(
      async result => {
        console.log(result);
        result.forEach((el: any) => {
          printZPL = designContent;
          var prefix: any; var suffix: any;
          prefix = localStorage.getItem('prefix');
          suffix = localStorage.getItem('suffix');
          var bytes = Buffer.from(prefix + el.serialNo + suffix);
          var text = this.toHexString(bytes);
          console.log(text);
          //var encoded=element.serialNo.getBytes(Charsets.UTF_8);
          var latest_date: any = this.datepipe.transform(el.expiratioN_DATE, 'dd-MM-yyyy');
          printZPL = printZPL.replace('[RFID]', text);
          printZPL = printZPL.replace('[BARCODE]', el.serialNo);
          printZPL = printZPL.replace('[BARCODE]', el.serialNo);
          printZPL = printZPL.replace('[RFIDNO]', el.serialNo);
          printZPL = printZPL.replace('[ITEMCODE]', el.itemCode);
          printZPL = printZPL.replace('[ITEMDESC]', el.itemName.substring(0, 40));
          printZPL = printZPL.replace('[SUPBATCHNO]', el.supplieR_LOT_NUMBER);
          printZPL = printZPL.replace('[LOTNO]', el.loT_NUMBER);
          printZPL = printZPL.replace('[LOCCODE]', el.orgCode + '/' + el.locationCode);
          printZPL = printZPL.replace('[EXPDATE]', latest_date);
          finalZPL += printZPL;
        });
        console.log(finalZPL);
        var _printFilter: prinrFilter = new prinrFilter;
        _printFilter.toDate = this.DemoTagPrintFormControls.ToDate.value;
        _printFilter.fromDate = this.DemoTagPrintFormControls.FromDate.value;
        _printFilter.orgIds = this.selectedorganizationList;
        _printFilter.locIds = this.selectedLocationList;
        _printFilter.itemIds = this.selectedItemList;
        _printFilter.batches = this.selectedBatchList;
        this.printList = await this.demoPrintService.getDataForPrint(_printFilter);
        this.agGrid.api.setRowData(this.printList);
        this.agGrid.api.refreshCells();
        this.loading = false;

        let printContents, popupWin;
        // printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin?.document.open();
        popupWin?.document.write(`
          <html>
            <head>
              <title>Print tab</title>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();setTimeout(function(){window.close();}, 10000);">${finalZPL}</body>
          </html>`
        );
        popupWin?.document.close();

      },
      err => {
        this.loading = false;
        this.error = err.error ? err.error : err.message;
      }
    );



  }

}
