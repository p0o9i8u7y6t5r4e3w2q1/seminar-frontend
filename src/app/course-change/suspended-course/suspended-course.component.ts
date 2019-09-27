import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-suspended-course',
  templateUrl: './suspended-course.component.html',
  styleUrls: ['./suspended-course.component.css'],
})
export class SuspendedCourseComponent extends BaseComponent implements OnInit {
  protected title = '刪除課程申請';
  course:any;
  readonly ROOT_URL='localhost/3000/course-change'

  date: Date;
  courseID:string;
  courseName: "";
  startPeriod:"";
  endPeriod:"";

  
  ngOnInit() {
    super.setTitle(this.title);
    this.courseID=this.route.snapshot.params['courseID'];
    this.course=this.http.get(this.ROOT_URL+'/find/'+this.courseID);
  }
  queryClassTime(){
    this.http.get(this.ROOT_URL+'/find/'+this.courseID);
    
  }
  deleteClass(){
    this.http.post(this.ROOT_URL+'suspend',{
      "scID": this.courseID,
      "timeRange": {
      "date": this.date,
      "startPeriod": this.startPeriod,
      "endPeriod": this.endPeriod}})
  }
}
