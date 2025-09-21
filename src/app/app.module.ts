import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinalGradeCalculatorComponent } from './final-grade-calculator/final-grade-calculator.component';
import { GpaCalculatorComponent } from './gpa-calculator/gpa-calculator.component';





@NgModule({
  declarations: [
    AppComponent,
    FinalGradeCalculatorComponent,
    GpaCalculatorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
