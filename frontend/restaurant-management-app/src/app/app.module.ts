import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//component
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AppComponent } from './app.component';
import { AccountListComponent } from './component/admin/admin-home/account-list/account-list.component';
import { DishDetailComponent } from './component/customer/dish-detail/dish-detail.component';
import { CategoryListComponent } from './component/admin/admin-home/category-list/category-list.component';
import { LoginComponent } from './component/backet/login/login.component';
import { RegisterComponent } from './component/backet/register/register.component';
import { FooterBarComponent } from './component/backet/footer-bar/footer-bar.component';
import { NavBarComponent } from './component/backet/nav-bar/nav-bar.component';
import { HomeComponent } from './component/customer/home/home.component';
import { AboutUsComponent } from './component/backet/about-us/about-us.component';
import { ContactComponent } from './component/backet/contact/contact.component';
//service
import { AccountService } from './services/account.service';
import { DishService } from './services/dish.service';
import { CategoryService } from './services/category.service';
//model
//
import { withFetch } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AdminDishesComponent } from './component/admin/admin-home/admin-dishes/admin-dishes.component';
import { TableBookingService } from './services/table-booking.service';
import { MyBookingComponent } from './component/customer/my-booking/my-booking.component';
import { TableBookingComponent } from './component/customer/table-booking/table-booking.component';
import { TableBookingAdminComponent } from './component/admin/admin-home/table-booking-admin/table-booking-admin.component';
import { CartComponent } from './component/cart/cart.component';
import { DishListComponent } from './component/customer/dish-list/dish-list.component';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    CategoryListComponent,
    DishDetailComponent,
    LoginComponent,
    DishListComponent,
    NavBarComponent,
    RegisterComponent,
    FooterBarComponent,
    HomeComponent,
    AboutUsComponent,
    ContactComponent,
    AdminHomeComponent,
    AdminDishesComponent,
    MyBookingComponent,
    TableBookingComponent,
    TableBookingAdminComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule, 
    FormsModule,
    MatSnackBarModule,
    NgbModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AccountService,
    CategoryService,
    DishService, 
    TableBookingService,
    OrderService,
    AuthService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
