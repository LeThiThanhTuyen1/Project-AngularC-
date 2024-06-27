import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:5100/api/payments';

  constructor(private http: HttpClient) {}

  postPayment(paymentDetails: any) {
    console.log('Posting payment details:', paymentDetails); // Log payment details
    return this.http.post<any>(this.apiUrl, paymentDetails);
  }
  
}
