import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
// import { Observable, of } from 'rxjs';
// import { Person , DatesInformation , OrderDetails } from '../../Feature/dashboard/interrface/dashboard-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private logger : NGXLogger) {this.logger.info('Auth Service called')}
}
