import { Routes } from '@angular/router';
import { MakeupCourseComponent } from './makeup-course/makeup-course.component';
import { SuspendedCourseComponent } from './suspended-course/suspended-course.component';
import { TaSettingComponent } from './ta-setting/ta-setting.component';
import { CourseChangeListComponent } from './course-change-list/course-change-list.component';

export const CourseChangeComponents = [
  MakeupCourseComponent,
  SuspendedCourseComponent,
  TaSettingComponent,
  CourseChangeListComponent,
];

export const CourseChangeRoutes: Routes = [
  { path: 'course-change', component: CourseChangeListComponent },
  { path: 'course-change/makeup/:courseID', component: MakeupCourseComponent },
  {
    path: 'course-change/suspended/:courseID',
    component: SuspendedCourseComponent,
  },
  { path: 'course-change/ta/:courseID', component: TaSettingComponent },
];
