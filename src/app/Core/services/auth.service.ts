import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient, private route: Router) { }
  token: any;
  private loginDemo = 'http://localhost:3000/api/users/login'; // Sample API

  login(json: string): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.loginDemo, json);
  }

  setToken(token: any) {
    this.token = token;
  }

  getToken() {
    let tok: any = false;

    if (typeof localStorage !== 'undefined') {
      // You can access localStorage here
      tok = localStorage.getItem('Token');
    }
    if (tok) {
      return tok;
    } else {
      this.route.navigateByUrl('/login');
      return tok;
    }
  }
}
