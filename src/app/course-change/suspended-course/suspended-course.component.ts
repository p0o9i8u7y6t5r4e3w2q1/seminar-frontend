import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { SuspendedCourseDto } from '../../../lib/api-request';
import { SemesterCourse } from '../../../lib/api-response';

@Component({
  selector: 'app-suspended-course',
  templateUrl: './suspended-course.component.html',
  styleUrls: ['./suspended-course.component.css'],
})
export class SuspendedCourseComponent extends BaseComponent implements OnInit {
  protected title = '刪除課程申請';
  // readonly ROOT_URL = 'localhost/3000/course-change';

  courseID: string;
  course: SemesterCourse = null;

  dto: SuspendedCourseDto = {
    classroomID: '',
    timeRange: {
      date: null,
      startPeriod: null,
      endPeriod: null,
    },
  };

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.route.snapshot.params['courseID'];
    this.api.get(`find/${this.courseID}`).subscribe((data: SemesterCourse) => {
      this.course = data;
    });
  }

  queryClassTime() {
    this.api
      .get(`schedule/semester-course/${this.courseID}`)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteClass() {
    this.api
      .post(`course-change/${this.courseID}`, this.dto)
      .subscribe(data => {
        alert('停課成功');
      });
  }
}
