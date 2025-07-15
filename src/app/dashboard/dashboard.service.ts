import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private reportBaseUrl = environment.apiBaseUrl + '/reports';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `${token}`
    });
  }
  // Get dashboard statistics
  getdashboardDetails(): Observable<any> {
    return this.http.get(`${this.reportBaseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }
}
