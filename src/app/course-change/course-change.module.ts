import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeupCourseComponent } from './makeup-course/makeup-course.component';
import { SuspendedCourseComponent } from './suspended-course/suspended-course.component';
import { TaSettingComponent } from './ta-setting/ta-setting.component';
import { CourseChangeRoutingModule } from './course-change-routing.module';
import { CourseChangeListComponent } from './course-change-list/course-change-list.component';

@NgModule({
  declarations: [
    MakeupCourseComponent,
    SuspendedCourseComponent,
    TaSettingComponent,
    CourseChangeListComponent,
  ],
  imports: [CommonModule, CourseChangeRoutingModule],
})
export class CourseChangeModule {}
