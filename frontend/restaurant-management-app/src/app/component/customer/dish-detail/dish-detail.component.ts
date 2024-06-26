import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../models/dish.model';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})

export class DishDetailComponent implements OnInit{
  dish: Dish | null = null;
  categoryName: string | null = null;

  constructor ( 
    private route: ActivatedRoute, 
    private dishService: DishService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.getDish(+id);
    }
  }

  getDish(id: number): void {
    this.dishService.getDishById(id).subscribe(dish => {
      this.dish = dish;
      this.getCategoryName(dish.CategoryID); // Fetch category name
    }, error => {
      console.error('Error fetching dish:', error);
    });
  }

  getCategoryName(categoryId: number): void {
    this.categoryService.getCategoryNameById(categoryId).subscribe(name => {
      this.categoryName = name;
    }, error => {
      console.error('Error fetching category name:', error);
    });
  }
}
