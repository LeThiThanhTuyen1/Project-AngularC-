using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using RestaurantManagementAPI.Data;
using RestaurantManagementAPI.Models;

namespace RestaurantManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly RestaurantContext _context;

        public AccountsController(RestaurantContext context)
        {
            _context = context;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Account account)
        {
            if (account == null)
            {
                return BadRequest("Invalid account data.");
            }

            Console.WriteLine($"Received Account Data: {account.Username}, {account.Password}, {account.Role}, {account.PhoneNumber}");

            if (string.IsNullOrEmpty(account.Username) || string.IsNullOrEmpty(account.Password) ||
                string.IsNullOrEmpty(account.Role) || string.IsNullOrEmpty(account.PhoneNumber))
            {
                return BadRequest("All fields are required.");
            }

            var existingAccount = await _context.Accounts.AnyAsync(a => a.Username == account.Username || a.PhoneNumber == account.PhoneNumber);
            if (existingAccount)
            {
                return BadRequest("Username or phone number already exists.");
            }

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok("Account registered successfully.");
        }


        // GET: api/Accounts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Accounts.ToListAsync();
        }

        // GET: api/Accounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // PUT: api/Accounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccount(int id, Account account)
        {
            if (id != account.AccountID)
            {
                return BadRequest();
            }

            _context.Entry(account).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountExists(id))
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

        // POST: api/Accounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccount", new { id = account.AccountID }, account);
        }

        // DELETE: api/Accounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return NotFound();
            }

            _context.Accounts.Remove(account);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AccountExists(int id)
        {
            return _context.Accounts.Any(e => e.AccountID == id);
        }
    }
}