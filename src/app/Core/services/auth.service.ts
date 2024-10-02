import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private logger : NGXLogger) { }
}
