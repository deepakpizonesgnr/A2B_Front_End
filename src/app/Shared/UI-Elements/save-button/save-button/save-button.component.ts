import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { buttonConstants } from '../const/button.constant';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [],
  providers : [buttonConstants],
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss'
})
export class SaveButtonComponent {
  constructor(private router : Router , private constant : buttonConstants){}
  toNavigate(urlName:string){
    if(urlName && urlName == this.constant.deshboard){
      this.router.navigate(['/' + urlName])
    }
  }
}
