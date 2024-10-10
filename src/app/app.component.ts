import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet , RouterModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'A2B_Front_End';
  isLoginRoute = false;
  constructor(private router : Router){
    this.router.events.subscribe(() => {
      this.isLoginRoute = this.router.url === '/login'; // Update based on your login route
    });
  }
}
