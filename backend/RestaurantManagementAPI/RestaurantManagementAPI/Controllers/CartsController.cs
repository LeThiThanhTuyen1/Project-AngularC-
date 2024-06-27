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
    public class CartsController : ControllerBase
    {
        private readonly RestaurantContext _context;

        public CartsController(RestaurantContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCart()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        [HttpGet("total/{accountId}")]
        public async Task<ActionResult<decimal>> GetTotalAmount(int accountId)
        {
            var totalAmount = await _context.Carts
                .Where(c => c.AccountID == accountId)
                .SumAsync(c => c.Price * c.Quantity);

            return Ok(totalAmount);
        }

        [HttpDelete("clear/{accountId}")]
        public async Task<IActionResult> ClearCart(int accountId)
        {
            var cartItems = _context.Carts.Where(c => c.AccountID == accountId);

            if (!cartItems.Any())
            {
                return NotFound("No cart items found for the given account ID.");
            }

            _context.Carts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("update-quantity/{id}")]
        public async Task<IActionResult> UpdateCartItemQuantity(int id, [FromBody] int quantity)
        {
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            cart.Quantity = quantity;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.CartID)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Lấy ID người dùng từ đối tượng Cart truyền vào từ frontend
            int userId = cart.AccountID; // Giả sử AccountID là trường chứa ID người dùng trong Cart

            // Thêm đối tượng Cart vào DbContext và lưu vào cơ sở dữ liệu
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            // Trả về đối tượng Cart đã được tạo thành công
            return CreatedAtAction("GetCart", new { id = cart.CartID }, cart);
}
        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("byaccount/{accountId}")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetTableBookingsByAccountId(int accountId)
        {
            var carts = await _context.Carts
                .Where(tb => tb.AccountID == accountId)
                .ToListAsync();

            if (carts == null)
            {
                return NotFound();
            }

            return carts;
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartID == id);
        }
    }
}
