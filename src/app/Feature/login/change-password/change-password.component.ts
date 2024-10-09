import { Component } from '@angular/core';
import { AuthService } from '../../../Core/services/auth.service';
import { Router } from '@angular/router';
import { loginConst, welcomeText } from '../const/login-const';
import { SaveButtonComponent } from '../../../Shared/UI-Elements/save-button/save-button/save-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { changePassword } from '../interface/login-interface';
import { SuccessEditComponent } from '../../../Shared/success-edit/success-edit.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule, FormsModule, SaveButtonComponent,SuccessEditComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  userData  = new changePassword();
  welcomeText: any = welcomeText;
  loginConstants: any = loginConst;
  oldPassError: string | null = null;  // Error message for old Password
  newPassError: string | null = null;  // Error message for new Password
  confirmPassError: string | null = null;  // Error message for password
  newOldPassError: string | null = null;  // Error message for password
  errorMessage: string | null = null;    // General error message for login
  isLoading: boolean = false;
  passwordChanged:boolean = false

  constructor(private Auth: AuthService, private route: Router) { }

  onSubmit(): void {
    this.isLoading = true
    this.passwordChanged = false
    // Reset error messages
    this.resetErrors();

    if (this.isFormValid()) {
      let json: any = {
        "oldPassword": this.userData.oldPass,
        "password": this.userData.newPass,
        "confirmPassword": this.userData.confirmPass
      }
      this.Auth.login(json).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.errorMessage = null;
          this.errorMessage = 'Login successful.';
          this.isLoading = false;
          this.Auth.setToken(response.token)
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('Token', this.Auth.token)
          }
          this.route.navigateByUrl('login');
          this.passwordChanged = true;
        },
        error: (error) => {
          if (error['customMessage'] == "Invalid credentials") {
            this.errorMessage = error['customMessage'];
          }
          console.log('Login failed', error);
          this.isLoading = false;
          this.passwordChanged = true;
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  // Validation logic
  private isFormValid(): boolean {
    const { oldPass, newPass, confirmPass } = this.userData;

    if (!oldPass?.trim() && !newPass?.trim() && !confirmPass?.trim()) {
      this.errorMessage = this.loginConstants.emptyFields;
      return false;
    }
    if (!newPass?.trim() && !confirmPass?.trim()) {
      this.errorMessage = this.loginConstants.emptyFields;
      return false;
    }
    if (!oldPass?.trim()) {
      this.oldPassError = this.loginConstants.oldPass;
      return false;
    }
    if (!newPass?.trim()) {
      this.newPassError = this.loginConstants.newPass;
      return false;
    }
    if (!confirmPass?.trim()) {
      this.confirmPassError = this.loginConstants.confirmPass;
      return false;
    }
    if (!(!newPass?.trim() && !confirmPass?.trim())) {
      if (newPass != confirmPass) {
        this.newOldPassError = this.loginConstants.newConfirmSame;
        return false;
      }
    }

    return true;
  }

  // Helper method to reset error messages
  private resetErrors(): void {
    this.oldPassError = null;
    this.newPassError = null;
    this.confirmPassError = null;
    this.newOldPassError = null;
    this.errorMessage = null;
  }
  normalState(){
    this.passwordChanged = false;
  }
}
