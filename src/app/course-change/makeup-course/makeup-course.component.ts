import { Component, OnInit , Input} from '@angular/core';
import { BaseComponent } from '../../basic';

interface MakeupCourseForm {
  courseID: string;
  classroomID: string;
  timeRange: {
    date: Date;
    startPeriod: string;
    endPeriod: string;
  };
}

@Component({
  selector: 'app-makeup-course',
  templateUrl: './makeup-course.component.html',
  styleUrls: ['./makeup-course.component.css'],
})
export class MakeupCourseComponent extends BaseComponent implements OnInit {
  protected title = '新增課程時段';
  //@Input() course;
  courseName: string;
  classroomID = '';
  date: Date;
  startPeriod = '';
  endPeriod = '';

  ngOnInit() {
    super.setTitle(this.title);
    this.courseName=this.route.snapshot.params['course'];
  
  }

  createBody() {
    return {
      classroomID: this.classroomID,
      timeRange: {
        date: this.date,
        startPeriod: this.startPeriod,
        endPeriod: this.endPeriod,
      },
    };
  }
}
