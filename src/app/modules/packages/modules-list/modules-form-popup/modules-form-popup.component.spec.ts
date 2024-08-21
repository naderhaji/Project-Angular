import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesFormPopupComponent } from './modules-form-popup.component';

describe('ModulesFormPopupComponent', () => {
  let component: ModulesFormPopupComponent;
  let fixture: ComponentFixture<ModulesFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulesFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulesFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
