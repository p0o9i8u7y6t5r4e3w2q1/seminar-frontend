import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-course-change-list',
  templateUrl: './course-change-list.component.html',
  styleUrls: ['./course-change-list.component.css'],
})
export class CourseChangeListComponent extends BaseComponent implements OnInit {
  protected title = '課程管理';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
