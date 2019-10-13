import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { SuspendedCourseDto } from '../../../lib/api-request';

@Component({
  selector: 'app-suspended-course',
  templateUrl: './suspended-course.component.html',
  styleUrls: ['./suspended-course.component.css'],
})
export class SuspendedCourseComponent extends BaseComponent implements OnInit {
  protected title = '刪除課程申請';
  course: any;
  // readonly ROOT_URL = 'localhost/3000/course-change';

  courseID: string;
  courseName: '';
  dto: SuspendedCourseDto = {} as SuspendedCourseDto;

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.route.snapshot.params['courseID'];
    this.course = this.api.get(`find/${this.courseID}`);
  }

  queryClassTime() {
    this.api.get(`find/${this.courseID}`);
  }

  deleteClass() {
    this.api.post('suspend', this.dto);
  }
}
