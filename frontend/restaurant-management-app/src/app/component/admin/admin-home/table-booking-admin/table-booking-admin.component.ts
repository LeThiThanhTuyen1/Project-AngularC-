import { Component, OnInit } from '@angular/core';
import { TableBooking } from '../../../../models/table-booking.model';
import { TableBookingService } from '../../../../services/table-booking.service';
import { NgForm } from '@angular/forms';
import { checkBookingValidity } from '../../../../check/check.table.booking';

@Component({
  selector: 'app-table-booking-admin',
  templateUrl: './table-booking-admin.component.html',
  styleUrls: ['./table-booking-admin.component.css']
})
export class TableBookingAdminComponent implements OnInit {
  bookings: TableBooking[] = [];
  selectedBooking: TableBooking = {
    BookingID: 0,
    AccountID: 0,
    CustomerName: '',
    NumberOfPeople: 0,
    Phone: '',
    BookingDate: new Date(),
    BookingTime: '',
    Notes: ''
  };

  constructor(private bookingService: TableBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getAllTableBookings().subscribe({
      next: (data: TableBooking[]) => {
        this.bookings = data;
        console.log('Bookings loaded:', this.bookings);
      },
      error: (err) => {
        console.error('Failed to load bookings:', err);
      }
    });
  }


  addBooking(form: NgForm) {
    if (form.valid && checkBookingValidity(this.selectedBooking)) {
      console.log('Data to be sent:', this.selectedBooking); 
      this.bookingService.createTableBooking(this.selectedBooking).subscribe(
        booking => {
          console.log('Booking added:', booking);
          form.resetForm();
          this.closeModal('addModal');
          this.loadBookings();
          alert('Thêm đặt bàn thành công.');
        },
        error => {
          console.error('Failed to add booking:', error);
          alert('Thêm đặt bàn thất bại.');
        }
      );
    }
  }

  openEditModal(booking: TableBooking) {
    this.selectedBooking = { ...booking };
    this.selectedBooking.BookingDate = new Date(this.selectedBooking.BookingDate); // Chuyển đổi ngày thành đối tượng Date
    this.openModal('editModal');
  }

  editBooking(form: NgForm) {
    if (form.valid && checkBookingValidity(this.selectedBooking)) {
      this.bookingService.updateTableBooking(this.selectedBooking.BookingID, this.selectedBooking).subscribe(
        updatedBooking => {
          console.log('Booking updated:', updatedBooking);
          this.closeModal('editModal');
          this.loadBookings();
          alert('Sửa đặt bàn thành công.');
        },
        error => {
          console.error('Failed to update booking:', error);
          alert('Sửa đặt bàn thất bại.');
        }
      );
    }
  }

  deleteBooking(booking: TableBooking) {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa đặt bàn của '${booking.CustomerName}' không?`);
    if (confirmed) {
      this.bookingService.deleteTableBooking(booking.BookingID).subscribe(
        () => {
          console.log('Booking deleted successfully:', booking);
          this.loadBookings();
        },
        error => {
          console.error('Failed to delete booking:', error);
          alert('Không thể xóa đặt bàn.');
        }
      );
    }
  }

  openModal(id: string) {
    document.getElementById(id)!.style.display = 'block';
  }

  closeModal(id: string) {
    document.getElementById(id)!.style.display = 'none';
  }
}
