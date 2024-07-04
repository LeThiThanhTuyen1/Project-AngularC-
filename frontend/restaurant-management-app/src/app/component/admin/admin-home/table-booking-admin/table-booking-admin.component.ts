import { Component, OnInit } from '@angular/core';
import { TableBooking } from '../../../../models/table-booking.model';
import { TableBookingService } from '../../../../services/table-booking.service';

@Component({
  selector: 'app-table-booking-admin',
  templateUrl: './table-booking-admin.component.html',
  styleUrls: ['./table-booking-admin.component.css']
})
export class TableBookingAdminComponent implements OnInit {
  bookings: TableBooking[] = [];
  futureBookings: TableBooking[] = [];

  constructor(private bookingService: TableBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAllTableBookings().subscribe({
      next: (data: TableBooking[]) => {
        this.bookings = data;
        this.filterFutureBookings();
        console.log('Bookings loaded:', this.futureBookings);
      },
      error: (err) => {
        console.error('Failed to load bookings:', err);
      }
    });
  }

  filterFutureBookings() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day
    this.futureBookings = this.bookings.filter(booking => {
      const bookingDate = new Date(booking.BookingDate);
      return bookingDate.getFullYear() === today.getFullYear() &&
             bookingDate.getMonth() === today.getMonth() &&
             bookingDate.getDate() === today.getDate();
    });
  }
}
