import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  IntroductionComponent,
  NotFoundComponent,
} from './basic';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { CourseChangeModule } from './course-change/course-change.module';
import { SemesterCourseModule } from './semester-course/semester-course.module';
import { MixedModule } from './mixed/mixed.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntroductionComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    BookingModule,
    CourseChangeModule,
    SemesterCourseModule,
    MixedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
