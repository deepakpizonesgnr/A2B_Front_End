import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;
  @HostBinding('class.no-scroll') get disableScroll() {
    return this.isLoading;
  }
}
