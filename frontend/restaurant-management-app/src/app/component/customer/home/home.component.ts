import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish.model';
import { Router } from '@angular/router';
import { ContactComponent } from '../../backet/contact/contact.component';
import { DishService } from '../../../services/dish.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public dishes: Dish[] = [];
  dishGroups: any[][] = [];

  constructor(private dishService: DishService,
              private router: Router) {}

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((data: Dish[]) => {
      this.dishes = data;
      this.dishGroups = this.createDishGroups(this.dishes, 4);
    });
  }       

  createDishGroups(dishes: any[], groupSize: number): any[][] {
    const groups = [];
    let group = [];

    for (let i = 0; i < dishes.length; i++) {
      group.push(dishes[i]);
      if (group.length === groupSize) {
        groups.push(group);
        group = [];
      }
    }

    // If the last group has less than 4 items, repeat the dishes to fill the group
    if (group.length > 0) {
      let index = 0;
      while (group.length < groupSize) {
        group.push(dishes[index]);
        index = (index + 1) % dishes.length;
      }
      groups.push(group);
    }

    return groups;
  }
  
}
