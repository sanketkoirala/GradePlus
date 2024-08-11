import { Component } from '@angular/core';

@Component({
  selector: 'app-final-grade-calculator',
  templateUrl: './final-grade-calculator.component.html',
  styleUrls: ['./final-grade-calculator.component.css']
})
export class FinalGradeCalculatorComponent {
  className: string = '';
  classNameSelected: boolean = false;
  syllabusItems: { name: string, grade: number, weight: number }[] = [];
  finalExamWeight: number = 0;
  finalGradeNeeded: number | null = null;
  finalExamEntered: boolean = false;

  onClassNameSubmit() {
    if (this.className) {
      this.classNameSelected = true;
    }
  }

  addSyllabusItem() {
    this.syllabusItems.push({ name: '', grade: 0, weight: 0 });
  }

  calculateNeededFinalGrade() {
    let currentGrade = 0;
    let totalWeight = 0;

    for (const item of this.syllabusItems) {
      currentGrade += item.grade * (item.weight / 100);
      totalWeight += item.weight;
    }

    const remainingWeight = 100 - totalWeight;
    if (remainingWeight !== this.finalExamWeight) {
      alert('The total weight of syllabus items and the final exam must equal 100%.');
      return;
    }

    this.finalGradeNeeded = (90 - currentGrade) / (this.finalExamWeight / 100);
  }
}
