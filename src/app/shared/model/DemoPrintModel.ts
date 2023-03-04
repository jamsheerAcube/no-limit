export class DemoPrintModel {
    statusText!:string;
    transactioN_ID!:string;
    creatioN_DATE!:Date;
    inventorY_ITEM_ID!:string;
    orG_ID!:number;
    loC_ID!:number;
    transactioN_QUANTITY!:number;
    printingQty!:number;
    iteM_ID!:number;
    transactioN_DATE!:Date;
    transactioN_REFERENCE!:string;
    transfeR_TRANSACTION_ID!:string;
    transactioN_TYPE!:string;
    loT_NUMBER!:string;
    expiratioN_DATE!:Date;
    supplieR_LOT_NUMBER!:string;
    prinT_QTY!:number;
    lasT_PRINTED_DATE!:Date;
    createD_DATE!:Date;
    createD_BY!:string;
    printeD_BY!:string;
    locationName!:string;
    locationCode!:string;
    organizatioN_NAME!:string;
    orgName!:string;
    orgCode!:string;
    suB_INV_CODE!:string;
    suB_INV_DES!:string;
    itemCode!:string;
    itemName!:string;
    uom!:string;
    supplieR_LOT!:string;
    internaL_LOT!:string;
    qty!:number;
    printqty!:number;
    serialNo!:string;
    batcH_ID!:string;
    createdBy!:string
    createdDate!:Date;
    sO_NUMBER!:string;
}

export class prinrFilter{
    orgIds!:any;
    locIds!:any[];
    itemIds!:any[];
    batches!:any[];
    fromDate!:Date;
    toDate!:Date;
    itemGroup!:boolean;
    batchGroup!:boolean;
    status!:number;
    SoNo!:string;
    printQtyFilter!:string;
}

export class UpdateSerialnoStatus{
    lstSerialNo!:lstSerialNo[]
    status!:number
    salesOrderNo!:string;
}
export class lstSerialNo{
    serialNo!:string
}

export class UpdateSalesOrderNoDTO {
    SerialNo!: string;
    SalesOrderNo!: string;
  }