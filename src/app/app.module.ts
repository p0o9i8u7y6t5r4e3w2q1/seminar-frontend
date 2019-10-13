import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponents } from './basic/basic.setting';
import { BookingComponents } from './booking/booking.setting';
import { CourseChangeComponents } from './course-change/course-change.setting';
import { MixedComponents } from './mixed/mixed.setting';
import { SemesterCourseComponents } from './semester-course/semester-course.setting';
import { UserComponents } from './user/user.setting';

@NgModule({
  declarations: [
    AppComponent,
    ...BasicComponents,
    ...BookingComponents,
    ...CourseChangeComponents,
    ...MixedComponents,
    ...SemesterCourseComponents,
    ...UserComponents,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
