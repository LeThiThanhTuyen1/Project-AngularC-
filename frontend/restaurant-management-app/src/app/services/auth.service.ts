import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
// export class AuthService {
//   private isLoggedInSubject = new BehaviorSubject<boolean>(false);
//   isLoggedIn$ = this.isLoggedInSubject.asObservable();
//   private roleSubject = new BehaviorSubject<string>('');
//   role$ = this.roleSubject.asObservable();
//   private userIdSubject = new BehaviorSubject<number>(0);
//   userId$ = this.userIdSubject.asObservable();

//   constructor(private router: Router) {}

//   login(role: string, userId: number) {
//     this.isLoggedInSubject.next(true);
//     this.roleSubject.next(role);
//     this.userIdSubject.next(userId);
//   }

//   logout() {
//     this.isLoggedInSubject.next(false);
//     this.roleSubject.next('');
//     this.userIdSubject.next(0);
//     this.router.navigate(['/home']);
//   }

//   isAuthenticated(): boolean {
//     return this.isLoggedInSubject.value;
//   }

//   getRole(): string {
//     return this.roleSubject.value;
//   }

//   getUserId(): number {
//     return this.userIdSubject.value;
//   }
// }
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private roleSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();
  private userIdSubject = new BehaviorSubject<number>(0);
  userId$ = this.userIdSubject.asObservable();

  constructor(private router: Router) {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const role = localStorage.getItem('role') || '';
      const userId = localStorage.getItem('userId');

      if (isLoggedIn) {
        this.isLoggedInSubject.next(true);
      }
      this.roleSubject.next(role);
      this.userIdSubject.next(userId ? +userId : 0);
    } else {
      console.warn('LocalStorage is not available. Running in a non-browser environment.');
    }
  }

  login(role: string, userId: number) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId.toString());
    }

    this.isLoggedInSubject.next(true);
    this.roleSubject.next(role);
    this.userIdSubject.next(userId);

    this.router.navigate(['/home']);
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    }

    this.isLoggedInSubject.next(false);
    this.roleSubject.next('');
    this.userIdSubject.next(0);

    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  getUserId(): number {
    return this.userIdSubject.value;
  }
}
