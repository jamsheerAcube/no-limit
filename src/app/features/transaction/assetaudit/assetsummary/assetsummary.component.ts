import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBindingDirective, GridComponent, SelectableSettings } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, filterBy, process } from '@progress/kendo-data-query';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { AssetAuditService } from 'src/app/core/service/assetaudit.service';
import { LocationmasterService } from 'src/app/core/service/locationmaster.service';
import { ReportsService } from 'src/app/core/service/reports.service';
import { AssetAuditModel, AuditAssetSummary, AuditFilter } from 'src/app/shared/model/AssetAuditModel';
import * as XLSX from 'xlsx'; 
declare var $: any;

@Component({
  selector: 'org-fat-assetsummary',
  templateUrl: './assetsummary.component.html',
  styleUrls: ['./assetsummary.component.css']
})
export class AssetsummaryComponent implements OnInit {
  @ViewChild(DataBindingDirective) directive: any;
  public filter!: CompositeFilterDescriptor;
  public state: any = {
    skip: 0,
    take: 10,
    filter: {
      logic: 'and',
      filters: []
    }
  }
  public gridView: any[]=[];
  public checkboxOnly = false;
public mode:any= "single";
public drag = false;
public selectableSettings!: SelectableSettings;
  constructor(private route: ActivatedRoute,

    private locationMasterService: LocationmasterService,
    private assetAuditService: AssetAuditService,
    private router: Router,private reportService:ReportsService) { 
      this.allData = this.allData.bind(this);
      this.setSelectableSettings();
    }
    auditId!:any;
    auditAssetSummaryData:AssetAuditModel[]=[];
  async ngOnInit() {

    this.route.params.subscribe(async params => {
      if (params['id'] != undefined) {
        this.auditId = params['id'];
        var auditFilter=new AuditFilter;
        auditFilter.AuditId=this.auditId;
        this.auditAssetSummaryData= await this.reportService.getAuditInventorySummaryList(auditFilter);
        this.gridView=this.auditAssetSummaryData;
        console.log(this.gridView);
      } 
    });

  }

  public allData(): ExcelExportData {
    const result: ExcelExportData = {
      data: process(this.gridView, {
        filter: this.filter,
        sort: [],
      }).data
    };

    return result;
  }

  public filterChange(filter: CompositeFilterDescriptor): void {
    this.filter = filter;
    this.gridView = filterBy(this.auditAssetSummaryData, filter);
  }

  public setSelectableSettings(): void {
    if (this.checkboxOnly || this.mode === "single") {
      this.drag = false;
    }

    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: this.mode,
      drag: this.drag,
    };
  }

  BacktoGrid()
  {
    this.router.navigateByUrl('/physicalcount');
  }

}
