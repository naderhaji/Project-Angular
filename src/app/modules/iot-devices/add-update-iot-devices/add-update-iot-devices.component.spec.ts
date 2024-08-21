import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateIOTDevicesComponent } from './add-update-iot-devices.component';

describe('AddUpdateIOTDevicesComponent', () => {
  let component: AddUpdateIOTDevicesComponent;
  let fixture: ComponentFixture<AddUpdateIOTDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateIOTDevicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUpdateIOTDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
