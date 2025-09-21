import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-grade-calculator',
  templateUrl: './final-grade-calculator.component.html',
  styleUrls: ['./final-grade-calculator.component.css']
})
export class FinalGradeCalculatorComponent implements OnInit {
  className: string = '';
  classNameSelected: boolean = false;
  currentGrade: number = 0;
  finalExamWeight: number = 0;
  targetGrade: number = 90;
  finalGradeNeeded: number | null = null;
  passingGradeNeeded: number | null = null;

  ngOnInit() {
    this.loadSavedData();
  }

  onClassNameSubmit() {
    if (this.className) {
      this.classNameSelected = true;
      this.saveData();
    }
  }

  calculateNeededFinalGrade() {
    if (this.finalExamWeight <= 0 || this.finalExamWeight > 100) {
      alert('Final exam weight must be between 1 and 100%.');
      return;
    }

    if (this.currentGrade < 0 || this.currentGrade > 100) {
      alert('Current grade must be between 0 and 100%.');
      return;
    }

    if (this.targetGrade < 0 || this.targetGrade > 100) {
      alert('Target grade must be between 0 and 100%.');
      return;
    }

    const currentWeight = 100 - this.finalExamWeight;
    const currentContribution = (this.currentGrade * currentWeight) / 100;

    this.finalGradeNeeded = (this.targetGrade - currentContribution) / (this.finalExamWeight / 100);
    this.finalGradeNeeded = Math.round(this.finalGradeNeeded * 100) / 100;

    // Reset passing grade when calculating target grade
    this.passingGradeNeeded = null;
    this.saveData();
  }

  calculatePassingGrade() {
    if (this.finalExamWeight <= 0 || this.finalExamWeight > 100) {
      alert('Final exam weight must be between 1 and 100%.');
      return;
    }

    if (this.currentGrade < 0 || this.currentGrade > 100) {
      alert('Current grade must be between 0 and 100%.');
      return;
    }

    const currentWeight = 100 - this.finalExamWeight;
    const currentContribution = (this.currentGrade * currentWeight) / 100;

    this.passingGradeNeeded = (60 - currentContribution) / (this.finalExamWeight / 100);
    this.passingGradeNeeded = Math.round(this.passingGradeNeeded * 100) / 100;

    // Reset target grade when calculating passing grade
    this.finalGradeNeeded = null;
    this.saveData();
  }

  saveData() {
    const data = {
      className: this.className,
      classNameSelected: this.classNameSelected,
      currentGrade: this.currentGrade,
      finalExamWeight: this.finalExamWeight,
      targetGrade: this.targetGrade,
      finalGradeNeeded: this.finalGradeNeeded,
      passingGradeNeeded: this.passingGradeNeeded
    };
    localStorage.setItem('finalGradeCalculatorData', JSON.stringify(data));
  }

  loadSavedData() {
    const savedData = localStorage.getItem('finalGradeCalculatorData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.className = data.className || '';
        this.classNameSelected = data.classNameSelected || false;
        this.currentGrade = data.currentGrade || 0;
        this.finalExamWeight = data.finalExamWeight || 0;
        this.targetGrade = data.targetGrade || 90;
        this.finalGradeNeeded = data.finalGradeNeeded || null;
        this.passingGradeNeeded = data.passingGradeNeeded || null;
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }

  clearSavedData() {
    localStorage.removeItem('finalGradeCalculatorData');
    this.className = '';
    this.classNameSelected = false;
    this.currentGrade = 0;
    this.finalExamWeight = 0;
    this.targetGrade = 90;
    this.finalGradeNeeded = null;
    this.passingGradeNeeded = null;
  }

  onInputChange() {
    this.saveData();
  }
}
