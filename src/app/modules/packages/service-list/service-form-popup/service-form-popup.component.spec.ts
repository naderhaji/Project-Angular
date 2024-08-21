import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormPopupComponent } from './service-form-popup.component';

describe('ServiceFormPopupComponent', () => {
  let component: ServiceFormPopupComponent;
  let fixture: ComponentFixture<ServiceFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
