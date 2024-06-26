import { Category } from './category.model';

export interface Dish {
    DishID: number;
    Name: string;
    Description: string;
    Price: number;
    ImageURL: string;
    CategoryID: number;
   // Category: Category;
  }
  