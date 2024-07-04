# Restaurant Management System

This is a Restaurant Management System with a frontend developed using Angular and a backend powered by ASP.NET Core (C#). The system allows restaurant staff to manage orders, table bookings, and other essential operations.
## Features
- Dish Management: Add, update, and track dishes.
- Table Booking: Manage table reservations including customer details and booking times.
- Cart Functionality: Add items to cart, manage cart items, and process payments.

## Installation
```bash
# clone the repository
git clone https://github.com/LeThiThanhTuyen1/Project-AngularC-
```
Backend
```bash
# Install Entity Framework Core
$ dotnet add package Microsoft.EntityFrameworkCore
$ dotnet add package Microsoft.EntityFrameworkCore.SqlServer
$ dotnet add package Microsoft.EntityFrameworkCore.Tools

# Install JWT Authentication
$ dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```
Frontend
```bash
# install 
$ npm install -g @angular/cli

# bootstrap
$ npm install bootstrap

# RxJS
$ npm install rxjs

# Angular Material
$ npm install @angular/material @angular/cdk @angular/animations
```

## Running the app

```bash
# backend
$ dotnet run

# frontend
$ ng serve
```

## Usage
Order Management
```bash
# Add items to cart
this.cartService.addItem(item);

# View cart items
this.cartService.getItems();
```

Table Booking
```bash
# Create a new booking
this.bookingService.createBooking(bookingDetails);

# View bookings
this.bookingService.getBookings();
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please ensure that you update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact
For more information, please contact:
- thanhtuyen162003@gmail.com
- oanhkieu2425@gmail.com
- dunghuynhthithu240@gmail.com
