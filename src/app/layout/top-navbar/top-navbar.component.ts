import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {
  profileMenuOpen = false;

  @Input() isSidebarOpen = true; // receive from parent

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  pageTitle = 'Dashboard';
  userDepartment: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const path = this.router.url.split('/')[1];
      this.pageTitle = this.getPageTitle(path);
    });
    const dept = this.authService.getUserDepartment();

    this.userDepartment = dept ? dept : '';

  }

  getPageTitle(path: string): string {
    switch (path) {
      case 'dashboard': return 'Dashboard';
      case 'products': return 'Products';
      case 'orders': return 'Orders';
      case 'customers': return 'Customers';
      case 'bills': return 'Bills';
      case 'receipts': return 'Receipts';
      case 'reports': return 'Reports';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  }
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  toggleSidebar() {
    console.log('Toggling sidebar');
    this.toggleSidebarEvent.emit();
  }


  logout() {
    this.router.navigate(['']);
  }

}
