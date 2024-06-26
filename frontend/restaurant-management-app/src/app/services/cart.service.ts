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

  getTableBookingsByAccountId(accountId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/byaccount/${accountId}`);
  }

  getCartsByAccountId(accountId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/byaccount/${accountId}`);
  }

  getItems() {
    return this.itemsSubject.asObservable();
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }
  
}
