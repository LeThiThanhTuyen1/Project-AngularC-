import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Dish } from '../models/dish.model';
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private apiUrl = 'http://localhost:5100/api';

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/dishes`);
  }
  
  getDishNameById(dishId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/dishes/${dishId}/name`, { responseType: 'text' }); // Sử dụng responseType: 'text'
  }

  getDishById(id: number): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/dishes/${id}`);
  }

  createDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(`${this.apiUrl}/dishes`, dish);
  }

  updateDish(id: number, dish: Dish): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/dishes/${id}`, dish);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/dishes/${id}`);
  }
  
  searchDishes(keyword: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/dishes/search?keyword=${keyword}`);
  }

}
