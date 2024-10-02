import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Sample API URL
  constructor(private readonly http:HttpClient) { }
  
  // Method to get posts from the API
  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
