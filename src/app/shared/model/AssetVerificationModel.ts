

export class AssetVerificationModel {
    receiptId!: string;
    refDocumentType!: string;
    refDocumentNo!: string;
    refDocumentDate!: Date;
    receiptDate!: Date;
    supplierId!: number;
    verifierRemarks!: string;
    isDeleted!: boolean;
}