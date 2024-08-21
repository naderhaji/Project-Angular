import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSubscriptionComponent } from './add-update-subscription.component';

describe('AddUpdateSubscriptionComponent', () => {
  let component: AddUpdateSubscriptionComponent;
  let fixture: ComponentFixture<AddUpdateSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
