import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTogglesComponent } from './button-toggles.component';

describe('ButtonTogglesComponent', () => {
  let component: ButtonTogglesComponent;
  let fixture: ComponentFixture<ButtonTogglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTogglesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonTogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
