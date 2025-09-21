import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalGradeCalculatorComponent } from './final-grade-calculator/final-grade-calculator.component';
import { GpaCalculatorComponent } from './gpa-calculator/gpa-calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/final-grade', pathMatch: 'full' },
  { path: 'final-grade', component: FinalGradeCalculatorComponent },
  { path: 'gpa-calculator', component: GpaCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
