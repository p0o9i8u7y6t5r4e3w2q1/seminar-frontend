import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CourseChangeComponents,
  CourseChangeRoutes,
} from './course-change.setting';

@NgModule({
  declarations: CourseChangeComponents,
  imports: [
    RouterModule.forChild(CourseChangeRoutes),
    CommonModule,
    FormsModule,
  ],
})
export class CourseChangeModule {}
