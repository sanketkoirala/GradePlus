import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalGradeCalculatorComponent } from './final-grade-calculator.component';

describe('FinalGradeCalculatorComponent', () => {
  let component: FinalGradeCalculatorComponent;
  let fixture: ComponentFixture<FinalGradeCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalGradeCalculatorComponent]
    });
    fixture = TestBed.createComponent(FinalGradeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
