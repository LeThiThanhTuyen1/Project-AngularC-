import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './component/admin/admin-home/account-list/account-list.component';
import { DishDetailComponent } from './component/customer/dish-detail/dish-detail.component';
import { DishListComponent } from './component/customer/dish-list/dish-list.component';
import { CategoryListComponent } from './component/admin/admin-home/category-list/category-list.component';
import { LoginComponent } from './component/backet/login/login.component';
import { RegisterComponent } from './component/backet/register/register.component';
import { AboutUsComponent } from './component/backet/about-us/about-us.component';
import { ContactComponent } from './component/backet/contact/contact.component';
import { HomeComponent } from './component/customer/home/home.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminDishesComponent } from './component/admin/admin-home/admin-dishes/admin-dishes.component';
import { MyBookingComponent } from './component/customer/my-booking/my-booking.component';
import { TableBookingComponent } from './component/customer/table-booking/table-booking.component';
import { AuthGuard } from './guard/auth.guard';
import { TableBookingAdminComponent } from './component/admin/admin-home/table-booking-admin/table-booking-admin.component';
import { CartComponent } from './component/cart/cart.component';

const routes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'dishes', component: DishListComponent },
  { path: 'dishes/:id', component: DishDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'admin/dishes', component: AdminDishesComponent},
  { path: 'mybooking', component: MyBookingComponent},
  { path: 'table-booking', component: TableBookingComponent, canActivate: [AuthGuard]},
  { path: 'table-booking-admin', component: TableBookingAdminComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: '/dishes', pathMatch: 'full' },
  { path: 'dishes', component: DishListComponent },
  { path: 'dish-detail/:id', component: DishDetailComponent },
  { path: 'mycart', component: CartComponent},
  { path: '**', redirectTo: '/home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
