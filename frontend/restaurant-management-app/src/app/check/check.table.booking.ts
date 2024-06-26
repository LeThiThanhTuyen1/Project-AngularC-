import { TableBooking } from "../models/table-booking.model";

export function checkBookingValidity(booking: TableBooking): boolean {
    const currentDate = new Date();
    const bookingDate = new Date(booking.BookingDate);
    const bookingTime = parseInt(booking.BookingTime.split(':')[0], 10); // Lấy giờ từ giờ đặt bàn (vd: '08:30' -> 8)

    // Kiểm tra ngày đặt bàn
    if (bookingDate < currentDate) {
        alert('Không thể đặt bàn trước ngày hiện tại.');
        return false;
    }

    // Kiểm tra số người phải lớn hơn 1
    if (booking.NumberOfPeople < 1) {
        alert('Đặt bàn cho 1 người trở lên.');
        return false;
    }

    // Kiểm tra giờ đặt bàn từ 7h đến 21h
    if (bookingTime < 7 || bookingTime > 21) {
        alert('Giờ đặt bàn phải từ 7 giờ đến trước 21 giờ.');
        return false;
    }

    // Nếu không có lỗi, trả về true
    return true;
}
