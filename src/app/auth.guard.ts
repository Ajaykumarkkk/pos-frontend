// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) { }

//   canActivate(): boolean {
//     const token = localStorage.getItem('token');
//     if (token) {
//       return true; // ✅ Token exists, allow access
//     } else {
//       this.router.navigate(['/login']); // ❌ No token, redirect to login
//       return false;
//     }
//   }
// }











import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
