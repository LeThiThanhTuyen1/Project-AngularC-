import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderDetail } from '../models/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5100/api/orders';

  constructor(private http: HttpClient) {}

  addOrder(order: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrl}`, order, { headers });
  }

  getOrderByUserIdAndStatus(userId: number, status: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?userId=${userId}&status=${status}`);
  }
}
