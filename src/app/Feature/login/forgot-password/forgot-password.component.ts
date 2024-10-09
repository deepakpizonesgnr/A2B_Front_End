import { Component } from '@angular/core';
import { AuthService } from '../../../Core/services/auth.service';
import { loginConst, welcomeText } from '../const/login-const';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaveButtonComponent } from '../../../Shared/UI-Elements/save-button/save-button/save-button.component';
import { forgotPassword } from '../interface/login-interface';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, SaveButtonComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  // constructor(private readonly loginServie:LoginService,private readonly http:HttpClient){}

  userData  = new forgotPassword();
  welcomeText: any = welcomeText;
  loginConstants: any = loginConst;
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
        "email": this.userData.email,
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
          this.route.navigateByUrl('login')
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
    const { email } = this.userData;

    if (!email?.trim()) {
      this.usernameError = this.loginConstants.invalidUser;
      return false;
    }

    if (!(!email?.trim())) {
      const phonePattern = /^[0-9]{10}$/;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneValid = phonePattern.test(email);
      const emailValid = emailPattern.test(email);
      if (!(phoneValid || emailValid)) {
        this.usernameError = this.loginConstants.invalidPhone;
      }
      return phoneValid || emailValid;
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
