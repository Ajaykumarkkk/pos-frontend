import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
// import { loadGapiInsideDOM, gapi } from './../../node_modules/gapi-script';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pos-frontend';
  showNav = false;

  constructor(private authService: AuthService, private router: Router) {
    // Watch route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNav = this.authService.isLoggedIn();
      }
    });
  }
  isSidebarOpen = true;
  toggleSidebar() {
    console.log('Toggling sidebar app');

    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // ngOnInit(): void {
  //   // loadGapiInsideDOM().then(() => {
  //   //   gapi.load('client:auth2', () => {
  //   //     gapi.client.init({
  //   //       apiKey: 'AIzaSyD08Hal8xI5JiuOp9ZQVyC5ZHP3Rhb6n04',
  //   //       clientId: '472261434099-m9qe68gg0ka0ii0kh7tp6f981fjtoqi2.apps.googleusercontent.com',
  //   //       scope: 'https://www.googleapis.com/auth/drive.file',
  //   //       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  //   //     }).then(() => {
  //   //       gapi.auth2.getAuthInstance().signIn(); // Trigger sign-in
  //   //     });
  //   //   });
  //   // });
  // }
}
