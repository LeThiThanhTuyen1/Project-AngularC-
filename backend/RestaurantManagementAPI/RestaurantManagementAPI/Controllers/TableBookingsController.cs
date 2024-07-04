using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantManagementAPI.Data;
using RestaurantManagementAPI.Models;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
namespace RestaurantManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableBookingsController : ControllerBase
    {
        private readonly RestaurantContext _context;

        public TableBookingsController(RestaurantContext context)
        {
            _context = context;
        }

        // GET: api/TableBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableBooking>>> GetTableBookings()
        {
            return await _context.TableBookings.ToListAsync();
        }

        // GET: api/TableBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TableBooking>> GetTableBooking(int id)
        {
            var tableBooking = await _context.TableBookings.FindAsync(id);

            if (tableBooking == null)
            {
                return NotFound();
            }

            return tableBooking;
        }

        [HttpGet("byaccount/{accountId}")]
        public async Task<ActionResult<IEnumerable<TableBooking>>> GetTableBookingsByAccountId(int accountId)
        {
            var tableBookings = await _context.TableBookings
                .Where(tb => tb.AccountID == accountId)
                .ToListAsync();

            if (tableBookings == null)
            {
                return NotFound();
            }

            return tableBookings;
        }
        // In your ASP.NET Core controller
        [HttpGet("countbydate")]
        public async Task<ActionResult<int>> GetBookingsCountForDateAsync([FromQuery] DateTime bookingDate)
        {
            var bookingsCount = await _context.TableBookings
                                            .Where(b => b.BookingDate.Date == bookingDate.Date)
                                            .CountAsync();

            return Ok(bookingsCount);
        }

        // PUT: api/TableBookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTableBooking(int id, TableBooking tableBooking)
        {
            if (id != tableBooking.BookingID)
            {
                return BadRequest();
            }

            _context.Entry(tableBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableBookingExists(id))
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

        // POST: api/TableBookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TableBooking>> PostTableBooking(TableBooking tableBooking)
        {
            _context.TableBookings.Add(tableBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTableBooking", new { id = tableBooking.BookingID }, tableBooking);
        }

        // DELETE: api/TableBookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTableBooking(int id)
        {
            var tableBooking = await _context.TableBookings.FindAsync(id);
            if (tableBooking == null)
            {
                return NotFound();
            }

            _context.TableBookings.Remove(tableBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TableBookingExists(int id)
        {
            return _context.TableBookings.Any(e => e.BookingID == id);
        }
    }
}