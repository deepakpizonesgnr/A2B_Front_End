import { NgModule } from "@angular/core";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

@NgModule({
    imports: [
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG, // Set your desired log level
        serverLoggingUrl: '/api/logs', // Optional server logging URL
        serverLogLevel: NgxLoggerLevel.ERROR, // Level of logs to be sent to the server
      }),
    ],
  })

export class AppLoggerModule{}