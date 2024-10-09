import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSyncComponent } from './menu-sync.component';

describe('MenuSyncComponent', () => {
  let component: MenuSyncComponent;
  let fixture: ComponentFixture<MenuSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
