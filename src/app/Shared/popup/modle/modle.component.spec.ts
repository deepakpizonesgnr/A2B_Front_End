import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModleComponent } from './modle.component';

describe('ModleComponent', () => {
  let component: ModleComponent;
  let fixture: ComponentFixture<ModleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
