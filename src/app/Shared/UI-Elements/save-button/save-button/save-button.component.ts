import { Component, Input } from '@angular/core';
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
export class SaveButtonComponent  {
  @Input() name : string = '' ;
  @Input() navigate : string = '' ;  
  constructor(private router : Router , private constant : buttonConstants){}
  toNavigate(){
    if(this.navigate && this.navigate == this.constant.syncMenu && this.navigate != ''){
      this.router.navigate(['/' + this.navigate])
    }
  }
}
