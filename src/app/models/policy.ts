export interface Policy {
  transactionId: number;
  ownerId: number;
  type: string;
  status: string;
  startDate: Date;
  endDate: Date;
  productType: string;
  altNo: string;
  version: string;
}
