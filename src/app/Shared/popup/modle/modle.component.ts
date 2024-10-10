import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
@Component({
  selector: 'app-modle',
  standalone: true,
  imports: [],
  templateUrl: './modle.component.html',
  styleUrl: './modle.component.scss'
})
export class ModleComponent {
@ViewChild('globalModel', { static: false }) modalElement!: ElementRef;
 @Input() title : string = '';
 @Input() context : string = '';
 @Output() clickToSure = new EventEmitter<any>();
 modalVisible : boolean = false;
 clickToSureEmit(){
  this.clickToSure.emit()
 }
}
