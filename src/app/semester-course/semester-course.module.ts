import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SemesterCourseComponents,
  SemesterCourseRoutes,
} from './semester-course.setting';

@NgModule({
  declarations: SemesterCourseComponents,
  imports: [
    RouterModule.forChild(SemesterCourseRoutes),
    CommonModule,
    FormsModule,
  ],
})
export class SemesterCourseModule {}
