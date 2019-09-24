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
  course:any;
  readonly ROOT_URL='localhost:3000/course-change'
  
  courseID: string;
  courseName: string;
  classroomID = '';
  date: Date;
  startPeriod = '';
  endPeriod = '';
  
  
  ngOnInit() {
    super.setTitle(this.title);
    this.courseID=this.route.snapshot.params['courseID'];
    this.course=this.http.get(this.ROOT_URL+'/find/'+this.courseID);
  }
  validateAddNewClassForm(){
    this.http.post(this.ROOT_URL+'/makeup',{
      "scID": this.courseID,
      "timeRange": {
      "date": this.date,
      "startPeriod": this.startPeriod,
      "endPeriod": this.endPeriod
    },
    "classroomID": this.classroomID})
    .subscribe((result) => {
      alert("hello from melo");
    })
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
