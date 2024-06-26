import { Injectable } from '@angular/core';
import { TableBooking } from '../models/table-booking.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableBookingService {

  private apiUrl = 'http://localhost:5100/api/tablebookings';

  constructor(private http: HttpClient) { }

  getAllTableBookings(): Observable<TableBooking[]> {
    return this.http.get<TableBooking[]>(this.apiUrl);
  }

  getMyTableBookings(): Observable<TableBooking[]> {
    return this.http.get<TableBooking[]>(`${this.apiUrl}/mybookings`);
  }

  getTableBookingById(id: number): Observable<TableBooking> {
    return this.http.get<TableBooking>(`${this.apiUrl}/${id}`);
  }

  getTableBookingsByAccountId(accountId: number): Observable<TableBooking[]> {
    return this.http.get<TableBooking[]>(`${this.apiUrl}/byaccount/${accountId}`);
  }

  createTableBooking(table: TableBooking): Observable<TableBooking> {
    return this.http.post<TableBooking>(this.apiUrl, table);
  }

  updateTableBooking(id: number, table: TableBooking): Observable<TableBooking> {
    return this.http.put<TableBooking>(`${this.apiUrl}/${id}`, table);
  }

  deleteTableBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
