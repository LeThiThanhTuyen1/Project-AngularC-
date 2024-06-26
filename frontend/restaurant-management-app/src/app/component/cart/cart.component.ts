import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DishService } from '../../services/dish.service';
import { Cart } from '../../models/cart.model';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  userId: number = 0;
  dishNames: { [key: number]: string } = {}; // To store dish names

  constructor(
    private cartService: CartService,
    private dishService: DishService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('Current userId:', this.userId);
    this.getCartsByAccountId();
  }

  checkout() {
    // Handle checkout
    alert('Thanh toán thành công!');
    this.cartService.clearCart();
  }

  getCartsByAccountId() {
    this.cartService.getCartsByAccountId(this.userId).subscribe(
      carts => {
        this.cart = carts;
        this.cart.forEach(cartItem => {
          this.getDishName(cartItem.DishID);
        });
      },
      error => {
        console.error('Error fetching carts:', error);
      }
    );
  }

  getDishName(dishId: number): void {
    this.dishService.getDishNameById(dishId).subscribe(
      name => {
        this.dishNames[dishId] = name;
        console.log(`Dish name for ID ${dishId}: ${name}`);
        this.cdRef.detectChanges(); // Thông báo Angular cập nhật view
      },
      error => {
        console.error(`Error fetching dish name for ID ${dishId}:`, error);
      }
    );
  }
}
