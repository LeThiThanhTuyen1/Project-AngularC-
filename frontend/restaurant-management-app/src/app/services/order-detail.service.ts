import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetail } from '../models/order-detail.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private apiUrl = 'http://localhost:5100/api/OrderDetails';
  
  constructor(private http: HttpClient) { }

  addOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    console.log('Sending order detail:', orderDetail);

    return this.http.post<OrderDetail>(`${this.apiUrl}`, orderDetail)
      .pipe(
        catchError(error => {
          console.error('Error adding order detail:', error);
          return throwError(error);
        })
      );
  }
}
