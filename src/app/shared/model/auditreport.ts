export class AuditReport {
    warehouseID!:number;
    warehouseCode!:string;
    warehouseName!:string;
    auditID!:string;
    remark!:string;
    releasedBy!:string;
    releasedDate!:string;
    closedBy!:string;
    auditStatusText!:string;
    closedDate!:string;
    createdBy!:string;
    createdDate!:string;
    status!:number;
    toBeAuditedOn!:string;
    companyID!: string;
    totalStock!: number;
    found!: number;
    missing!:number;
    locationMismatch!:number;
    locationMismatchApproved!:number;
    unknown!:number;
}

export class AuditWebHistoryReport
{
    found!:AuditReportDetail[];
    missing!:AuditReportDetail[];
    extra!:AuditReportDetail[];
    locationMismatch!:AuditReportDetail[];
    locationMismatchApproved!:AuditReportDetail[];
    totalStock!:AuditReportDetail[];
}

export class AuditReportDetail {
    auditID!:string;
    systemLocationID!:string;
    systemLocationCode!:string;
    systemLocationName!:string;
    scanLocationID!:number;
    scanLocationCode!:string;
    scanLocationName!:string;
    serialNumber!:number;
    status!:number;
    statusText!:string;
    itemCode!:string;
    itemName!:string;
    scannedBy!:string;
    scannedDate!:string;
    lineStatus!:number;
}

export class AuditReportFilter {
    auditID!:string;
    warehouseID!:string;
    fromDate!:string;
    toDate!:string;
}

export class TabModel
{
    TabName!:string;
    TabActive!:string;
    TabSelected!:boolean;
    TabText!:string;
}
