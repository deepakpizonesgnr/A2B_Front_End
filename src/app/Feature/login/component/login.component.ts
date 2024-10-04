import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import globalInterceptor from '../../../Core/interceptors/global.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth.service';
import { loginConst } from '../const/login-const';
import { Router } from '@angular/router';

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

  constructor(private Auth: AuthService, private route: Router) { }

  onSubmit(): void {
    this.isLoading = true
    // Reset error messages
    this.resetErrors();

    if (this.isFormValid()) {
      let json: any = {
        "username": this.userData.username,
        "password": this.userData.password
      }
      this.Auth.login(json).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.errorMessage = null;
          this.errorMessage = 'Login successful.';
          this.isLoading = false;
          this.Auth.setToken(response.token)
          this.Auth.token;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('Token', this.Auth.token)
          }
          this.route.navigateByUrl('view/dashboard')
        },
        error: (error) => {
          if (error['customMessage'] == "Invalid credentials") {
            this.errorMessage = error['customMessage'];
          }
          console.log('Login failed', error);
          this.isLoading = false;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  // Validation logic
  private isFormValid(): boolean {
    const { username, password } = this.userData;
    if (!username?.trim() && !password?.trim()) {
      this.errorMessage = this.loginConst.invalidUserAndPass;
      return false;
    }

    if (!username?.trim()) {
      this.usernameError = this.loginConst.invalidUser;
      return false;
    }

    if (!password?.trim()) {
      this.passwordError = this.loginConst.invalidPass;
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
