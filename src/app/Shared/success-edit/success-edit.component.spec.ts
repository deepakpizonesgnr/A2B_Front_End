import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessEditComponent } from './success-edit.component';

describe('SuccessEditComponent', () => {
  let component: SuccessEditComponent;
  let fixture: ComponentFixture<SuccessEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
