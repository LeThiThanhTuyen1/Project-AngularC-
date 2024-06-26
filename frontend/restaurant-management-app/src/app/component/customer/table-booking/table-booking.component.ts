import { Component, OnInit } from '@angular/core';
import { TableBooking } from '../../../models/table-booking.model';
import { TableBookingService } from '../../../services/table-booking.service';
import { AuthService } from '../../../services/auth.service';
import { checkBookingValidity } from '../../../check/check.table.booking';
@Component({
  selector: 'app-table-booking',
  templateUrl: './table-booking.component.html',
  styleUrls: ['./table-booking.component.css']
})
export class TableBookingComponent implements OnInit {
  booking: TableBooking = {
    BookingID: 0,
    AccountID: null,
    CustomerName: '',
    Phone: '',
    NumberOfPeople: 0,
    BookingDate: new Date(),
    BookingTime: '',
    Notes: null
  };

  constructor(
    private bookingService: TableBookingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.booking.AccountID = this.authService.getUserId();
    }
  }

  onSubmit() {
    const bookingData = {
      ...this.booking,
      userId: this.authService.isAuthenticated() ? this.authService.getUserId() : 0
    };
    if( checkBookingValidity(bookingData)) {
      this.bookingService.createTableBooking(bookingData).subscribe(response => {
        console.log('Đặt bàn thành công:', response);
        alert('Đặt bàn thành công.')
      }, error => {
        console.error('Đặt bàn thất bại:', error);
        alert('Yêu cầu thất bại.')
      });
    }
  }
}
