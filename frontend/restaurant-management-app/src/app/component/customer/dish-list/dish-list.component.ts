import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { DishService } from '../../../services/dish.service';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css'] 
})
export class DishListComponent implements OnInit {

  dishes: Dish[] = [];
  allDishes: any[] = [];
  filteredDishes: any[] = [];
  categories: Category[] = [];
  searchKeyword: string = '';
  selectedCategoryId: number | null = null;

  constructor(public dishService: DishService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private orderService: OrderService,
              public categoryService: CategoryService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchKeyword = params['search'] || '';
      this.selectedCategoryId = params['category'] || null;

      if (this.searchKeyword) {
        this.searchDishes(this.searchKeyword);
      } else {
        this.getAllDishes();
      }
    });

    this.getCategories();
  }

  searchDishes(keyword: string): void {
    this.dishService.searchDishes(keyword).subscribe(
      data => {
        this.allDishes = data;
        this.filteredDishes = this.filterDishesByCategory(this.selectedCategoryId);
      },
      error => {
        if (error.status === 404) {
          this.filteredDishes = []; // Thiết lập mảng filteredDishes thành mảng trống
        }
        console.error('Error fetching search results', error);
      }
    );
  }

  addToCart(dishId: number) {
    const userId = this.authService.getUserId();
    if (userId) {
      const dish = this.allDishes.find(d => d.DishID === dishId);
      if (dish) {
        const cartData = {
          dishID: dish.DishID,
          accountID: userId,
          price: dish.Price, // Đảm bảo trường price tồn tại trong dish
          quantity: 1 // Giả sử số lượng là 1 khi thêm vào giỏ hàng
        };
  
        this.cartService.addToCart(cartData)
          .subscribe(
            () => {
              alert('Thêm vào giỏ hàng thành công.');
            },
            (error) => {
              console.error('Lỗi khi thêm vào giỏ hàng:', error);
              alert('Đã xảy ra lỗi khi thêm vào giỏ hàng.');
            }
          );
      } else {
        alert('Món ăn không tồn tại.');
      }
    } else {
      alert('Bạn cần phải đăng nhập để thêm vào giỏ hàng.');
      this.authService.logout();
    }
  }
     
  
  addOrderDetail(orderId: number, dishId: number) {
    // Example function to add order details using the orderId and dishId
    console.log(`Adding order detail for OrderID ${orderId} and DishID ${dishId}`);
    // Implement your logic to add order details here
  }   
  
  getAllDishes(): void {
    this.dishService.getAllDishes().subscribe(
      data => {
        this.allDishes = data;
        this.filteredDishes = this.filterDishesByCategory(this.selectedCategoryId);
      },
      error => {
        console.error('Error fetching dishes', error);
      }
    );
  }

  getCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  filterByCategory(event: Event, categoryId: number): void {
    event.preventDefault();
    this.selectedCategoryId = categoryId;
    this.filteredDishes = this.filterDishesByCategory(categoryId);
  }

  filterDishesByCategory(categoryId: number | null): any[] {
    if (categoryId === null) {
      return this.allDishes;
    }
    return this.allDishes.filter(dish => dish.CategoryID === categoryId);
  }

  getCategoryCount(categoryId: number): number {
    return this.allDishes.filter(dish => dish.CategoryID === categoryId).length;
  }
}
