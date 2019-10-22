import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-semester-course-list',
  templateUrl: './semester-course-list.component.html',
  styleUrls: ['./semester-course-list.component.css'],
})
export class SemesterCourseListComponent extends BaseComponent
  implements OnInit {
  protected title = '學期課程';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
