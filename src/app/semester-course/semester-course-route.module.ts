import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterCourseComponent } from './semester-course/semester-course.component';
import { SemesterCourseListComponent } from './semester-course-list/semester-course-list.component';

const semesterCourseRoutes: Routes = [
  {
    path: 'semester-course',
    component: SemesterCourseListComponent,
  },
  {
    path: 'semester-course/create',
    component: SemesterCourseComponent,
    data: { type: 'create' },
  },
  {
    path: 'semester-course/modify',
    component: SemesterCourseComponent,
    data: { type: 'modify' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(semesterCourseRoutes)],
  exports: [RouterModule],
})
export class SemesterCourseRouteModule {}
