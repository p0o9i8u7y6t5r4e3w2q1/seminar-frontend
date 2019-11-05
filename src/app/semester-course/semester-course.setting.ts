import { Routes } from '@angular/router';
import { SemesterCourseListComponent } from './semester-course-list/semester-course-list.component';
import { SemesterCourseComponent } from './semester-course/semester-course.component';

export const SemesterCourseComponents = [
  SemesterCourseListComponent,
  SemesterCourseComponent,
];

export const SemesterCourseRoutes: Routes = [
  {
    path: 'semester-course',
    component: SemesterCourseListComponent,
  },
  {
    path: 'semester-course/create',
    component: SemesterCourseComponent,
  },
  {
    path: 'semester-course/modify/:scID',
    component: SemesterCourseComponent,
  },
];
