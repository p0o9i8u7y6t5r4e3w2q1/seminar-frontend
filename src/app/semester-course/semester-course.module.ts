import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemesterCourseListComponent } from './semester-course-list/semester-course-list.component';
import { SemesterCourseComponent } from './semester-course/semester-course.component';
import { SemesterCourseRouteModule } from './semester-course-route.module';

@NgModule({
  declarations: [SemesterCourseListComponent, SemesterCourseComponent],
  imports: [CommonModule, SemesterCourseRouteModule],
})
export class SemesterCourseModule {}
