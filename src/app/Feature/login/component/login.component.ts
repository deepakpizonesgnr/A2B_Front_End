import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import globalInterceptor from '../../../Core/interceptors/global.interceptor';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: globalInterceptor,
      multi: true, // This allows multiple interceptors
    },
  ]
})
export class LoginComponent {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Sample API URL

  constructor(private readonly loginServie:LoginService,private readonly http:HttpClient){}

    checkInterCeptor() {
      console.log('hello')
        this.loginServie.getPosts().subscribe((res:any)=>{
          res
        });
    }
}
