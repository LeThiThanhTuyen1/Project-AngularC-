import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../models/account.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts: Account[] = [];
  newAccount: Account = { AccountID: 0, Username: '', Password: '', Role: '', PhoneNumber: ''};
  
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAllAccounts()
      .subscribe(accounts => {
        console.log(accounts); // Log dữ liệu ra console
        this.accounts = accounts;
      }, error => {
        console.error('Error fetching accounts:', error);
      });
  }
  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data: Account[]) => {
        this.accounts = data;
        console.log('Accounts loaded:', this.accounts);
      },
      error: (err) => {
        console.error('Failed to load accounts:', err);
      }
    });
  }

  addAccount(form: NgForm) {
    if (form.valid) {
      this.accountService.createAccount(this.newAccount).subscribe(
        account => {
          console.log('Account added:', account);
          form.resetForm();
          (document.getElementById('id04')!).style.display = 'none'; // Close modal after successful addition
          this.loadAccounts();
          alert('Thêm thành công.');
        },
        error => {
          alert('Tài khoản đã tồn tại.'); // Display an alert to the user on error
          console.error('Failed to add account:', error);
        }
      );
    }
  }
  

  deleteAccount(account: any) {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa '${account.Username}' không?`);
    if (confirmed) {
      this.accountService.deleteAccount(account.AccountID).subscribe(
        (response) => {
          console.log('Account deleted successfully:', account);
          this.loadAccounts(); 
          alert('Xóa thành công.');
        },
        error => {
          alert('Không thể xóa vì ràng buộc dữ liệu.');
          console.error('Failed to delete account:', error);
        }
      );
    }
  }
}