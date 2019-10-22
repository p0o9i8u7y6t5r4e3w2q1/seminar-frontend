import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../basic';
import { CreateMakeupCourseFormDto } from '../../../lib/api-request';
import { SemesterCourse } from '../../../lib/api-response';

@Component({
  selector: 'app-makeup-course',
  templateUrl: './makeup-course.component.html',
  styleUrls: ['./makeup-course.component.css'],
})
export class MakeupCourseComponent extends BaseComponent implements OnInit {
  protected title = '新增課程時段';

  courseID: string;
  course: SemesterCourse = null;

  form: CreateMakeupCourseFormDto = {
    classroomID: '',
    timeRange: {
      date: null,
      startPeriod: '',
      endPeriod: '',
    },
  };

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.route.snapshot.params['courseID'];
    console.log(this.courseID);
    this.api
      .get(`/semester-courses/${this.courseID}`)
      .subscribe((result: SemesterCourse) => {
        this.course = result;
      });
  }

  validateAddNewClassForm() {
    this.api
      .post(`/course-change/${this.courseID}/makeup`, this.form)
      .subscribe(result => {
        alert('補課申請已送出');
        this.router.navigate(['course-change']);
      });
  }
}
