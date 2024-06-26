import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public Username: string = '';
  public Password: string = '';
  public confirmPassword: string = '';
  public PhoneNumber: string = '';
  public Role: string = 'Customer';
  public message: string = '';
  public formSubmitted: boolean = false;
  usernameExists: boolean = false;
  phonenumberExists: boolean = false;

  constructor(private accountService: AccountService, private router: Router) {}

  checkUserName() {
    this.message = '';
    this.accountService.getAllAccounts()
      .subscribe(p => {
        this.usernameExists = p.some(p => p.Username === this.Username);
      });
  }

  checkPhoneNumber() {
    this.message = '';
    this.accountService.getAllAccounts()
      .subscribe(p => {
        this.phonenumberExists = p.some(p => p.PhoneNumber === this.PhoneNumber);
      });
  }

  register(): void {
    this.formSubmitted = true;
    if (this.Username && this.Password && this.confirmPassword && this.PhoneNumber.length === 10) {
      // Kiểm tra nếu username đã tồn tại trước khi đăng ký
      if (this.usernameExists) {
        this.message = 'Tên tài khoản đã tồn tại';
        return;
      }
  
      if (this.phonenumberExists) {
        this.message = 'Số điện thoại đã được đăng ký';
        return;
      }
  
      if (this.confirmPassword != this.Password) {
        this.message = 'Mật khẩu nhập lại không khớp';
        return;
      }
      // Nếu username chưa tồn tại, thực hiện đăng ký
      this.accountService.register(this.Username, this.Password, this.Role, this.PhoneNumber)
        .subscribe(
          response => {
            console.log('Đăng ký thành công', response);
            this.message = 'Đăng ký thành công';
            this.router.navigate(['login']);
          },
          error => {
            console.error('Đăng ký thất bại', error); // Log chi tiết lỗi
            this.message = error;
          }
        );
    } else {
      this.message = 'Làm ơn điền vào các trường còn trống';
    }
  }

}
