// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {

//   constructor() { }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // private orderBaseUrl = 'http://localhost:3000/v1/order';
  // private billBaseUrl = 'http://localhost:3000/v1/bill';

  // private orderBaseUrl = 'https://pos-backend-fjnx.onrender.com/v1/order';
  // private billBaseUrl = 'https://pos-backend-fjnx.onrender.com/v1/bill';

  private orderBaseUrl = environment.apiBaseUrl + '/order';
  private billBaseUrl = environment.apiBaseUrl + '/bill';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `${token}`
    });
  }

  // ============================
  // 🔸 ORDER CRUD
  // ============================

  // Create a new order
  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.orderBaseUrl}/create`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Get all orders
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.orderBaseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get order by ID
  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.orderBaseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update an order
  updateOrder(id: number, data: any): Observable<any> {
    return this.http.put(`${this.orderBaseUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete an order
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.orderBaseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // ============================
  // 🔸 BILL CRUD
  // ============================

  // Create a new bill
  createBill(data: any): Observable<any> {
    return this.http.post(`${this.billBaseUrl}/create`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Get all bills
  getAllBills(): Observable<any> {
    return this.http.get(`${this.billBaseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get bill by ID
  getBillById(id: number): Observable<any> {
    return this.http.get(`${this.billBaseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Update a bill
  updateBill(id: number, data: any): Observable<any> {
    return this.http.put(`${this.billBaseUrl}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete a bill
  deleteBill(id: number): Observable<any> {
    return this.http.delete(`${this.billBaseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
