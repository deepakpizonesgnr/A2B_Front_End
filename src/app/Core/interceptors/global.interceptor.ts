import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export default class globalInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Request URL: ', req);
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer my-token')
    });
    return handler.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        console.error('Interceptor Error: ', error);

        // Return an observable with a user-facing error message
        return throwError(() => new Error('http Something went wrong; please try again later.'));
      })
    );
  }
}