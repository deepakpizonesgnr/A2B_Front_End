import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Sample API URL
  constructor(private readonly http:HttpClient) { }
  


  private loginDemo = 'https://dummyjson.com/auth/login'; // Sample API

  // constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.loginDemo, body);
  }
}
