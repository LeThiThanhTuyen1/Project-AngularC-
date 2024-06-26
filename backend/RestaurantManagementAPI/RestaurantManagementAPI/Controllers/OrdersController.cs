using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementAPI.Data;
using RestaurantManagementAPI.Models;

namespace RestaurantManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly RestaurantContext _context;

        public OrdersController(RestaurantContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddToOrder([FromBody] Order order)
        {
            if (order == null || order.AccountID == 0)
            {
                return BadRequest("Invalid order data.");
            }

            var existingOrder = _context.Orders
                .FirstOrDefault(o => o.AccountID == order.AccountID && o.Status == "Pending");

            if (existingOrder == null)
            {
                // Nếu chưa có đơn hàng "Pending", tạo đơn hàng mới
                existingOrder = new Order
                {
                    AccountID = order.AccountID,
                    OrderDate = DateTime.Now,
                    TotalAmount = order.TotalAmount,
                    Status = order.Status,
                };
                _context.Orders.Add(existingOrder);
                _context.SaveChanges();
            }

            return Ok(existingOrder);
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderID }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            var orders = _context.Orders.ToList();  // Replace with your actual logic to fetch orders
            return Ok(orders);
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderID == id);
        }
    }
}