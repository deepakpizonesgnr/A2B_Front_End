import { Component } from '@angular/core';
import { SaveButtonComponent } from "../../../Shared/UI-Elements/save-button/save-button/save-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SaveButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
