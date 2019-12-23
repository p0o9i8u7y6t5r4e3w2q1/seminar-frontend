import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponents } from './basic/basic.setting';
import { BookingComponents } from './booking/booking.setting';
import { CourseChangeComponents } from './course-change/course-change.setting';
import { MixedComponents } from './mixed/mixed.setting';
import { SemesterCourseComponents } from './semester-course/semester-course.setting';
import { UserComponents } from './user/user.setting';
import { ConstantStringPipe, TimezoneDatePipe, DEFAULT_SETTING } from './basic';
import { NgPipesModule } from 'ngx-pipes';
import { NgxSpinnerModule } from 'ngx-spinner';

DEFAULT_SETTING.TIMEZONE = 'Z';

@NgModule({
  declarations: [
    AppComponent,
    ...BasicComponents,
    ...BookingComponents,
    ...CourseChangeComponents,
    ...MixedComponents,
    ...SemesterCourseComponents,
    ...UserComponents,
    ConstantStringPipe,
    TimezoneDatePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSmartModalModule.forRoot(),
    AppRoutingModule,
    NgPipesModule,
    NgxSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
