namespace RestaurantManagementAPI.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }
        public int AccountID { get; set; } // Tài khoản người đặt hàng
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } // Trạng thái đơn hàng (Pending, Completed, Cancelled, etc.)

    }
}