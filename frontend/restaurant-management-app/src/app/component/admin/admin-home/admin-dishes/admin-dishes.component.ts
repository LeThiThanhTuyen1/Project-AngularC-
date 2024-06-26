import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../../services/dish.service';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../models/category.model';
import { Dish } from '../../../../models/dish.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.css']
})
export class AdminDishesComponent implements OnInit {
  dishes: Dish[] = [];
  selectedDish: Dish = { DishID: 0, Name: '', Description: '', Price: 0, ImageURL: '', CategoryID: 0 };
  newDish: Dish = { DishID: 0, Name: '', Description: '', Price: 0, ImageURL: '', CategoryID: 0 };

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes(): void {
    this.dishService.getAllDishes().subscribe({
      next: (data: Dish[]) => {
        this.dishes = data;
        console.log('Dishes loaded:', this.dishes);
      },
      error: (err) => {
        console.error('Failed to load dishes:', err);
      }
    });
  }

  openEditModal(dish: Dish): void {
    this.selectedDish = { ...dish }; // Make a copy of the dish object
    document.getElementById('id03')!.style.display = 'block';
  }

  addDish(form: NgForm): void {
    if (form.valid) {
      this.dishService.createDish(this.newDish).subscribe(
        dish => {
          console.log('Dish added:', dish);
          form.resetForm();
          document.getElementById('id04')!.style.display = 'none'; // Close modal after successful addition
          this.loadDishes();
          alert('Thêm thành công.');
        },
        error => {
          alert('Mã danh mục không hợp lệ.'); // Display an alert to the user on error
          console.error('Failed to add dish:', error);
        }
      );
    }
  }

  editDish(form: NgForm): void {
    if (form.valid) {
      this.dishService.updateDish(this.selectedDish.DishID, this.selectedDish).subscribe(
        updatedDish => {
          console.log('Dish updated:', updatedDish);
          document.getElementById('id03')!.style.display = 'none'; // Close modal after successful update
          alert('Sửa thành công.');
          this.loadDishes();
        },
        error => {
          console.error('Failed to update dish:', error);
        }
      );
    }
  }

  deleteDish(dish: Dish): void {
    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa '${dish.Name}' không?`);
    if (confirmed) {
      this.dishService.deleteDish(dish.DishID).subscribe(
        () => {
          console.log('Dish deleted successfully:', dish);
          this.loadDishes();
          alert('Xóa thành công.');
        },
        error => {
          alert('Không thể xóa món ăn do ràng buộc dữ liệu.');
          console.error('Failed to delete dish:', error);
        }
      );
    }
  }
}
