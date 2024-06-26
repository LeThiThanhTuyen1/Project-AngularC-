export interface TableBooking {
    BookingID: number;
    AccountID: number | null;
    CustomerName: string;
    NumberOfPeople: number;
    Phone: string;
    BookingDate: Date;
    BookingTime: string; 
    Notes: string | null;
  }
  