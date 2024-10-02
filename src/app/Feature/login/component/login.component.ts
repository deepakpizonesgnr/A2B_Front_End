import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import globalInterceptor from '../../../Core/interceptors/global.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth.service';
import { loginConst } from '../const/login-const';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: globalInterceptor,
      multi: true, // This allows multiple interceptors
    },
  ]
})
export class LoginComponent {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos/1'; // Sample API URL

  // constructor(private readonly loginServie:LoginService,private readonly http:HttpClient){}
  userData: any = {
    username: '',
    password: '',
  }
  loginConst: any = loginConst;
  usernameError: string | null = null;  // Error message for username
  passwordError: string | null = null;  // Error message for password
  errorMessage: string | null = null;    // General error message for login
  isLoading: boolean = false;

  constructor(private Auth: AuthService) { }

  onSubmit(): void {
    this.isLoading = true
    // Reset error messages
    this.resetErrors();

    if (this.isFormValid()) {
      this.Auth.login(this.userData.username, this.userData.password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.errorMessage = null;
          this.errorMessage = 'Login successful.';
          this.isLoading = false;
        },
        error: (error) => {
          console.log('Login failed', error);
          this.isLoading = false;
          this.errorMessage = this.loginConst.invalidCred;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  // Validation logic
  private isFormValid(): boolean {
    const { username, password } = this.userData;
    let error = 0;
    if (!username?.trim()) {
      this.usernameError = this.loginConst.invalidUser;
      error++;
    }

    if (!password?.trim()) {
      this.passwordError = this.loginConst.invalidPass
      error++;
    }

    if (!username?.trim() && !password?.trim()) {
      this.errorMessage = this.loginConst.invalidUserAndPass
      error++;
    }

    if (error >= 2) {
      this.usernameError = null;
      this.passwordError = null;
      this.errorMessage = this.loginConst.invalidUserAndPass;
      return false;
    }
    if (error == 1) {
      return false;
    }
    return true;
  }

  // Helper method to reset error messages
  private resetErrors(): void {
    this.usernameError = null;
    this.passwordError = null;
    this.errorMessage = null;
  }
}
