import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotDevicesComponent } from './iot-devices.component';

describe('IotDevicesComponent', () => {
  let component: IotDevicesComponent;
  let fixture: ComponentFixture<IotDevicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IotDevicesComponent]
    });
    fixture = TestBed.createComponent(IotDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
