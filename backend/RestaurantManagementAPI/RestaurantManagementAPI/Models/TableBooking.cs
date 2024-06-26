using System;
using System.ComponentModel.DataAnnotations;

namespace RestaurantManagementAPI.Models
{
    public class TableBooking
    {
        [Key]
        public int BookingID { get; set; }
        public int AccountID { get; set; }
        public string? CustomerName { get; set; }
        public int NumberOfPeople { get; set; }
        public DateTime BookingDate { get; set; }
        public TimeSpan BookingTime { get; set; }
        public string? Phone { get; set; }
        public string? Notes { get; set; }
    }
}
