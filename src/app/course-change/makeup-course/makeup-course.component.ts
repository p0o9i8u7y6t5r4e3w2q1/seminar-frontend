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
  currentCourse:any;
  
  courseID: string;
  courseName: string;
  classroomID = '';
  date: Date;
  startPeriod = '';
  endPeriod = '';
  
  
  ngOnInit() {
    super.setTitle(this.title);
    this.courseID=this.route.snapshot.params['courseID'];
    console.log(this.courseID);
    this.api.get('/semester-course/findOne/'+this.courseID)
    .subscribe((result)=>{
      this.currentCourse=result;
    })
    console.log(this.currentCourse);
  }
  validateAddNewClassForm(){
    this.api.post('/course-change/makeup/'+this.courseID,{
      "scID": this.courseID,
      "timeRange": {
      "date": this.date,
      "startPeriod": this.startPeriod,
      "endPeriod": this.endPeriod
    },
    "classroomID": this.classroomID})
    .subscribe((result) => {
      alert("補課申請已送出");
      this.router.navigate(['course-change']);
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
