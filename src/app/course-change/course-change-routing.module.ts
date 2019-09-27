import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseChangeListComponent } from './course-change-list/course-change-list.component';
import { MakeupCourseComponent } from './makeup-course/makeup-course.component';
import { SuspendedCourseComponent } from './suspended-course/suspended-course.component';
import { TaSettingComponent } from './ta-setting/ta-setting.component';


const courseChangeRoutes: Routes = [
  { path: 'course-change', component: CourseChangeListComponent },
  { path: 'course-change/makeup/:courseID', component: MakeupCourseComponent },
  { path: 'course-change/suspended/:courseID', component: SuspendedCourseComponent },
  { path: 'course-change/ta/:courseID', component: TaSettingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(courseChangeRoutes)],
  exports: [RouterModule],
})
export class CourseChangeRoutingModule {}
