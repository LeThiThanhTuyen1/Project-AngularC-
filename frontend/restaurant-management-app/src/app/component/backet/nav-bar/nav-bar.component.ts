import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  searchKeyword: string = '';
  isLoggedIn: boolean = false;
  role: string = '';

  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.roleSubscription = this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    if (this.searchKeyword) {
      this.router.navigate(['/dishes'], { queryParams: { search: this.searchKeyword } });
    }
  }
}
