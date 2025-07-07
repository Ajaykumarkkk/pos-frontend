import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() open = true;
  // console.log('SidebarComponent initialized with open:', open);


  constructor(private router: Router) { }

  @Output() closeSidebarEvent = new EventEmitter<void>();

  closeSidebar() {
    this.closeSidebarEvent.emit();
  }
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  yess() {
    // this.router.navigate(['/dashboard']);
    console.log('Navigating to dashboard');

  }
}
