export interface Order {
    OrderID?: number;
    OrderDate: Date;
    AccountID: number;
    TotalAmount: number;
    Status: string;
  }