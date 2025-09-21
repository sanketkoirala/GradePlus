import { Component, OnInit } from '@angular/core';

interface Course {
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

interface Semester {
  name: string;
  courses: Course[];
  gpa: number;
  totalCredits: number;
}

@Component({
  selector: 'app-gpa-calculator',
  templateUrl: './gpa-calculator.component.html',
  styleUrls: ['./gpa-calculator.component.css']
})
export class GpaCalculatorComponent implements OnInit {
  currentSemester: Course[] = [];
  previousSemesters: Semester[] = [];

  currentSemesterGPA: number = 0;
  currentSemesterCredits: number = 0;
  cumulativeGPA: number = 0;
  totalCredits: number = 0;

  // For CGPA calculation
  previousCGPA: number = 0;
  previousTotalCredits: number = 0;
  newCGPA: number = 0;
  showCGPASection: boolean = false;

  gradeScale = [
    { letter: 'A', points: 4.0 },
    { letter: 'B', points: 3.0 },
    { letter: 'C', points: 2.0 },
    { letter: 'D', points: 1.0 },
    { letter: 'F', points: 0.0 }
  ];

  ngOnInit() {
    this.loadSavedData();
  }

  addCourse() {
    this.currentSemester.push({
      name: '',
      credits: 3,
      grade: 'A',
      gradePoints: 4.0
    });
    this.saveData();
  }

  removeCourse(index: number) {
    this.currentSemester.splice(index, 1);
    this.calculateCurrentSemesterGPA();
    this.saveData();
  }

  onGradeChange(course: Course) {
    const gradeInfo = this.gradeScale.find(g => g.letter === course.grade);
    course.gradePoints = gradeInfo ? gradeInfo.points : 0;
    this.calculateCurrentSemesterGPA();
    this.saveData();
  }

  calculateCurrentSemesterGPA() {
    if (this.currentSemester.length === 0) {
      this.currentSemesterGPA = 0;
      this.currentSemesterCredits = 0;
      this.showCGPASection = false;
      return;
    }

    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of this.currentSemester) {
      if (course.name && course.credits > 0) {
        totalPoints += course.gradePoints * course.credits;
        totalCredits += course.credits;
      }
    }

    this.currentSemesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    this.currentSemesterCredits = totalCredits;

    // Show CGPA section if current semester has courses
    this.showCGPASection = totalCredits > 0;

    if (this.showCGPASection) {
      this.calculateNewCGPA();
    }
  }

  calculateNewCGPA() {
    if (this.previousTotalCredits > 0 && this.previousCGPA > 0) {
      // Calculate total points from previous semesters
      const previousTotalPoints = this.previousCGPA * this.previousTotalCredits;

      // Calculate total points from current semester
      let currentTotalPoints = 0;
      for (const course of this.currentSemester) {
        if (course.name && course.credits > 0) {
          currentTotalPoints += course.gradePoints * course.credits;
        }
      }

      // Calculate new CGPA
      const totalPoints = previousTotalPoints + currentTotalPoints;
      const totalCredits = this.previousTotalCredits + this.currentSemesterCredits;

      this.newCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    } else {
      // If no previous CGPA, new CGPA is same as current semester GPA
      this.newCGPA = this.currentSemesterGPA;
    }
  }

  onPreviousCGPAChange() {
    this.calculateNewCGPA();
    this.saveData();
  }

  onPreviousCreditsChange() {
    this.calculateNewCGPA();
    this.saveData();
  }

  getGradeFromPoints(points: number): string {
    for (const grade of this.gradeScale) {
      if (points >= grade.points) {
        return grade.letter;
      }
    }
    return 'F';
  }

  saveData() {
    const data = {
      currentSemester: this.currentSemester,
      currentSemesterGPA: this.currentSemesterGPA,
      currentSemesterCredits: this.currentSemesterCredits,
      previousCGPA: this.previousCGPA,
      previousTotalCredits: this.previousTotalCredits,
      newCGPA: this.newCGPA,
      showCGPASection: this.showCGPASection
    };
    localStorage.setItem('gpaCalculatorData', JSON.stringify(data));
  }

  loadSavedData() {
    const savedData = localStorage.getItem('gpaCalculatorData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        this.currentSemester = data.currentSemester || [];
        this.currentSemesterGPA = data.currentSemesterGPA || 0;
        this.currentSemesterCredits = data.currentSemesterCredits || 0;
        this.previousCGPA = data.previousCGPA || 0;
        this.previousTotalCredits = data.previousTotalCredits || 0;
        this.newCGPA = data.newCGPA || 0;
        this.showCGPASection = data.showCGPASection || false;
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }

  clearSavedData() {
    localStorage.removeItem('gpaCalculatorData');
    this.currentSemester = [];
    this.currentSemesterGPA = 0;
    this.currentSemesterCredits = 0;
    this.previousCGPA = 0;
    this.previousTotalCredits = 0;
    this.newCGPA = 0;
    this.showCGPASection = false;
  }

  onInputChange() {
    this.calculateCurrentSemesterGPA();
    this.saveData();
  }
}
