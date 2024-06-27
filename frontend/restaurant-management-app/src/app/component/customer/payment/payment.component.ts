import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentDate: string = '';
  paymentMethod: string = 'Thanh toán khi nhận hàng';
  totalAmount: number = 0;
  accountId: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.accountId = this.authService.getUserId();
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    this.paymentDate = `${year}-${month}-${day}`;

    this.cartService.getTotalAmount(this.accountId).subscribe(
      (amount) => this.totalAmount = amount,
      (error) => console.error('Error fetching total amount', error)
    );
  }

  onSubmit(paymentForm: NgForm) {
    if (paymentForm.valid) {
      const paymentDetails = {
        PaymentID: 0,
        CustomerID: this.accountId,
        CustomerName: paymentForm.value.customerName,
        Address: paymentForm.value.address,
        PaymentDate: new Date(this.paymentDate),
        Amount: this.totalAmount,
        PaymentMethod: this.paymentMethod
      };

      // Xử lý logic thanh toán tại đây (có thể gọi API để lưu thông tin thanh toán)
      console.log('Thanh toán thành công', paymentDetails);
      alert('Thanh toán thành công');

      this.cartService.clearCart(this.accountId).subscribe(
        () => {
          console.log('Giỏ hàng đã được làm trống');
          this.router.navigate(['/mycart']); // Chuyển hướng về trang giỏ hàng
        },
        (error) => console.error('Error clearing cart', error)
      );
    } else {
      alert('Vui lòng điền đầy đủ thông tin');
    }
  }
}
