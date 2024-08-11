import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  numberOfClasses: number = 0;
  grades: number[] = [];
  percentage: number | null = null;
  numberOfClassesSelected: boolean = false;

  onClassNumberSubmit() {
    if (this.numberOfClasses > 0) {
      this.grades = new Array(this.numberOfClasses).fill(0);
      this.numberOfClassesSelected = true;
    }
  }

  calculatePercentage() {
    const total = this.grades.reduce((acc, grade) => acc + grade, 0);
    this.percentage = total / this.numberOfClasses;
  }
}
