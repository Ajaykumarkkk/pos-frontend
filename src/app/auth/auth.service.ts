import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/v1'; // Adjust backend URL

  constructor(private http: HttpClient) { }


  getAllDepartment() {
    return this.http.get(`${this.baseUrl}/department`);
  }

  register(userData: { name: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/user`, userData);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  logout() {
    localStorage.removeItem('token');
  }

  // isLoggedIn(): boolean {
  //   return localStorage.getItem('isLoggedIn') === 'true';
  // }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  user(user: string) {
    localStorage.setItem('user', user);
  }

  userDepartment(userDepartment: string) {
    localStorage.setItem('userDepartment', userDepartment);
  }

  refreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserDepartment() {
    return localStorage.getItem('userDepartment');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
