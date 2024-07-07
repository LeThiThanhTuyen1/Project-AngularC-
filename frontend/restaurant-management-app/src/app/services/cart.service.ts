import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dish } from '../models/dish.model';
import { Cart } from '../models/cart.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Cart[] = [];
  private itemsSubject = new BehaviorSubject<Cart[]>(this.items);
  
  private apiUrl = 'http://localhost:5100/api/Carts';

  constructor(private http: HttpClient) {}

  addToCart(cartData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(this.apiUrl, cartData, { headers });
  }  
  
  getCartsByAccountId(accountId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/byaccount/${accountId}`);
  }

  updateCartItemQuantity(cartId: number, quantity: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-quantity/${cartId}`, quantity);
  }

  clearCart(accountId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear/${accountId}`);
  }
  
  getTotalAmount(accountId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total/${accountId}`);
  }
  
  deleteCartItem(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  } 
}
