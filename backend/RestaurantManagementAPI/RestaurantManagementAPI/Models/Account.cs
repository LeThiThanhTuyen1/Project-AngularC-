using Microsoft.AspNetCore.Identity;

namespace RestaurantManagementAPI.Models
{
    public class Account
    {
        public int AccountID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
    }
}
