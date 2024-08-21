import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFormPopupComponent } from './feature-form-popup.component';

describe('FeatureFormPopupComponent', () => {
  let component: FeatureFormPopupComponent;
  let fixture: ComponentFixture<FeatureFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureFormPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeatureFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
