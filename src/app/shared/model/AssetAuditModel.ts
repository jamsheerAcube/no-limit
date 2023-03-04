import { AssetAuditVerifyModel } from "./AssetAuditVerifyModel";

export class AssetAuditModel {
  auditDate!:string;
  remarks!:string;
  locations!:number[];
  department!:string[]
  lifeStyle!:string[]
  auditId!: string;
  // scannedloC_ID!:number;
 lineStatus!:number;
  // statusText!:string;
  // auditId!: string;
  // toBeAuditedOn!: Date;
  // remark!: string;
  auditStatus!: number;
  auditStatusText!: string;
  // locations!: string[];
  // items!: string[];
  // batches!: BatchModel[];
  // isDeleted!: boolean;
  // createdBy!: string;
  // releasedBy!: string;
  // releasedDate!: any;
  // closedBy!: string;
  // closedDate!: any;
  // createdDate!: Date;
  // modifiedBy!: string;
  // modifiedDate!: Date;
  // orgName!:string;
  // orgCode!:string;
  // orG_ID!:any;
  // found!:number;
  // totalStock!:number;
  // missing!:number;
  // locationMismatch!:number;
  // locationMismatchApproved!:number;
  // unknown!:number;
  serialNos!: AssetAuditModel[];
  // locationCode!:string;
  // lOC_ID!:number;
  // locationName!:string;
  // itemCode!:string;
  // itemName!:string;
  // iteM_ID!:number;
  // assignedUnits!:number;
  // inventoryUnits!:number;
  // loT_NUMBER!:string;
  // expiratioN_DATE!:any;
  // serialNo!:string;
  // scanLocationCode!:string;
  // scanLocationName!:string;
  // newAssets!:number;
  // totalAssigned!:number;
  // scannedDate!:Date;
  // scannedBy!:string;
}

export class RS_AssetAuditModel {
  auditDate!:string;
  auditId!: string;
  departments!:[];
  locations!:[]
  lifetStyles!:[]
  remarks!:string;
}

export class BatchModel
{
  iteM_ID!:number;
  batch!:string;
}

export class AuditAssetSummary{
  locationName!:string;
  productName!:string;
  assetCategoryName!:string;
  assetSubCategoryName!:string;
  assetCount!:number;
}

export class AuditFilter
{
  fromDate!:any;
  toDate!:any;
  AuditId!:any;
}