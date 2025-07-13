import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // private baseUrl = 'http://localhost:3000/v1/product'; // Adjust backend URL
  private baseUrl = 'https://pos-backend-fjnx.onrender.com/v1/product'; // Adjust backend URL

  constructor(private http: HttpClient) { }

  // login(credentials: { email: string; password: string }) {
  //   return this.http.post(`${this.baseUrl}/login`, credentials);
  // }

  // createProductss(formData: FormData): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, formData);
  // }

  createProduct(formData: FormData) {
    const token = localStorage.getItem('token'); // or use a service

    const headers = new HttpHeaders({
      Authorization: `${token}`
    });
    return this.http.post(`${this.baseUrl}/create`, formData, { headers });
    // return this.http.post(`http://localhost:3000/uploadssssss`, formData, { headers });
  }

  getAllProduct() {
    const token = localStorage.getItem('token'); // or use a service
    const headers = new HttpHeaders({
      Authorization: `${token}`
    });
    return this.http.get(`${this.baseUrl}`, { headers });
  }

  deleteProduct(productId: number) {
    const token = localStorage.getItem('token'); // or use a service
    const headers = new HttpHeaders({
      Authorization: `${token}`
    });
    return this.http.delete(`${this.baseUrl}/${productId}`, { headers });
  }
  getOneProduct(id: number) {
    const token = localStorage.getItem('token'); // or use a service
    const headers = new HttpHeaders({
      Authorization: `${token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  updateProduct(id: number, data: FormData) {
    const token = localStorage.getItem('token'); // or use a service
    const headers = new HttpHeaders({
      Authorization: `${token}`
    });
    return this.http.put(`${this.baseUrl}/${id}`, data, { headers });
  }


}
