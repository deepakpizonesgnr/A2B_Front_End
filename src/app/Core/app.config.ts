import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import globalInterceptor from './interceptors/global.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
   provideClientHydration(),
   {
    provide: HTTP_INTERCEPTORS,
    useClass: globalInterceptor, // Register your interceptor here
    multi: true, // Allow multiple interceptors
  },]
};
