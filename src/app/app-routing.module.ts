import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicRoutes } from './basic/basic.setting';
import { BookingRoutes } from './booking/booking.setting';
import { CourseChangeRoutes } from './course-change/course-change.setting';
import { SemesterCourseRoutes } from './semester-course/semester-course.setting';
import { MixedRoutes } from './mixed/mixed.setting';
import { UserRoutes } from './user/user.setting';

@NgModule({
  imports: [
    RouterModule.forChild([
      ...BookingRoutes,
      ...CourseChangeRoutes,
      ...MixedRoutes,
      ...SemesterCourseRoutes,
      ...UserRoutes,
    ]),
    RouterModule.forRoot(BasicRoutes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
