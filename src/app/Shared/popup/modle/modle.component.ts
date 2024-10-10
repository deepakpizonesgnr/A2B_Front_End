import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modle',
  standalone: true,
  imports: [],
  templateUrl: './modle.component.html',
  styleUrl: './modle.component.scss'
})
export class ModleComponent {
 @Input() title : string = '';
 @Input() context : string = '';
 @Output() clickToSure = new EventEmitter<any>();
 clickToSureEmit(){
  this.clickToSure.emit()
 }
}
