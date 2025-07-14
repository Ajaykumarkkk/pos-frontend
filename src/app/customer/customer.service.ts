import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // private baseUrl = 'http://localhost:3000/v1/customer'; // Change if backend route differs
  // private baseUrl = 'https://pos-backend-fjnx.onrender.com/v1/customer'; // Change if backend route differs
  private baseUrl = environment.apiBaseUrl + '/customer'; // Change if backend route differs

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `${token}`
    });
  }

  // 🔹 Create a new customer
  createCustomer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Get all customers
  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Get one customer by ID
  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Update a customer
  updateCustomer(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Delete a customer
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
