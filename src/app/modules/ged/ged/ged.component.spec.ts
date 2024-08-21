import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GedComponent } from './ged.component';

describe('GedComponent', () => {
  let component: GedComponent;
  let fixture: ComponentFixture<GedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GedComponent]
    });
    fixture = TestBed.createComponent(GedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
