import { Component } from '@angular/core';
import { AppLoggerModule } from '../../../Core/logger.module';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AppLoggerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private logger : NGXLogger){
    this.logger.info('this is information')
  }
}
