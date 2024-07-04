import { Component, OnInit } from '@angular/core';
import { TableBooking } from '../../../models/table-booking.model';
import { TableBookingService } from '../../../services/table-booking.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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
    BookingDate: new Date(), // Initialize with current date
    BookingTime: '',
    Notes: null
  };

  constructor(
    private bookingService: TableBookingService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.booking.AccountID = this.authService.getUserId();
    }
  }

  onSubmit() {
    // Ensure bookingDate is a valid Date object
    const bookingDate = this.booking.BookingDate instanceof Date ? this.booking.BookingDate : new Date(this.booking.BookingDate);

    this.bookingService.getBookingsCountForDate(bookingDate).subscribe(
      bookingsCount => {
        if (bookingsCount >= 10) {
          alert('Hôm nay đã hết bàn. Vui lòng chọn ngày khác.');
        } else {
          this.bookingService.createTableBooking(this.booking).subscribe(
            response => {
              console.log('Đặt bàn thành công:', response);
              this.router.navigate(['mybooking']);
              alert('Đặt bàn thành công.');
            },
            error => {
              console.error('Đặt bàn thất bại:', error);
              alert('Yêu cầu thất bại.');
            }
          );
        }
      },
      error => {
        console.error('Lỗi khi kiểm tra số lượng bàn đã đặt:', error);
        alert('Đã xảy ra lỗi khi kiểm tra số lượng bàn đã đặt.');
      }
    );
  }
}
