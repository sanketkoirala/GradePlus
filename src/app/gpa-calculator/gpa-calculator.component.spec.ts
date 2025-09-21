import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpaCalculatorComponent } from './gpa-calculator.component';

describe('GpaCalculatorComponent', () => {
  let component: GpaCalculatorComponent;
  let fixture: ComponentFixture<GpaCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GpaCalculatorComponent]
    });
    fixture = TestBed.createComponent(GpaCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
