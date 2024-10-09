import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import globalInterceptor from './interceptors/global.interceptor';
import { GlobalErrorHandler } from './services/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()),
  provideClientHydration(),provideHttpClient(withFetch()), provideAnimationsAsync(),
  provideHttpClient(withFetch()),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: globalInterceptor, // Register your interceptor here
    multi: true, // Allow multiple interceptors
  },
  { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
