export interface Payment {
    PaymentID?: number;
    CustomerID: number;
    CustomerName: string;
    Address: string;
    PaymentDate: Date;
    Amount: number;
    PaymentMethod: string;
  }