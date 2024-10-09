import { Component } from '@angular/core';
import { SaveButtonComponent } from "../../../Shared/UI-Elements/save-button/save-button/save-button.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import globalInterceptor from '../../../Core/interceptors/global.interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/services/auth.service';
import { loginConst, welcomeText } from '../const/login-const';
import { Router } from '@angular/router';
import { userLogin } from '../interface/login-interface';
import { DatesInformation } from '../../dashboard/interrface/dashboard-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, SaveButtonComponent],
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
  userData  = new userLogin();
  DatesInformation : DatesInformation[] = []
  loginConst: any = loginConst;
  welcomeText: any = welcomeText;
  usernameError: string | null = null;  // Error message for email
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
        "email": this.userData.email,
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
    const { email, password } = this.userData;
    if (!email?.trim() && !password?.trim()) {
      this.errorMessage = this.loginConst.invalidUserAndPass;
      return false;
    }

    if (!email?.trim()) {
      this.usernameError = this.loginConst.invalidUser;
      return false;
    }
    let haveEmail = !!email?.trim();
    if (haveEmail) {
      const phonePattern = /^[0-9]{10}$/;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneValid = phonePattern.test(email);
      const emailValid = emailPattern.test(email);
      if (!(phoneValid || emailValid)) {
        this.usernameError = this.loginConst.invalidPhone;
      }
      return phoneValid || emailValid;
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

  goToForgot(){
    this.route.navigateByUrl('forgot-password')
  }
  goToChangePass(){
    this.route.navigateByUrl('change-password')
  }
}
