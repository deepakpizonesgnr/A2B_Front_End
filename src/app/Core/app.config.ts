import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import globalInterceptor from './interceptors/global.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
   provideClientHydration(),
   provideHttpClient(withFetch()),
   {
    provide: HTTP_INTERCEPTORS,
    useClass: globalInterceptor, // Register your interceptor here
    multi: true, // Allow multiple interceptors
  },
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
]
};
