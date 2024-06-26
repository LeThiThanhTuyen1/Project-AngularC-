namespace RestaurantManagementAPI.Models
{
    public class Cart
    {
        public int CartID { get; set; }
        public int DishID { get; set; }
        public int AccountID { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
