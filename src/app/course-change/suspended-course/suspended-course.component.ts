import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-suspended-course',
  templateUrl: './suspended-course.component.html',
  styleUrls: ['./suspended-course.component.css'],
})
export class SuspendedCourseComponent extends BaseComponent implements OnInit {
  protected title = '刪除課程申請';

  date: Date;

  courseName: string;

  
  ngOnInit() {
    super.setTitle(this.title);
    this.courseName=this.route.snapshot.params['course'];
  }
}
