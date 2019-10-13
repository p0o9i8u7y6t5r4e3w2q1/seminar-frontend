import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-course-change-list',
  templateUrl: './course-change-list.component.html',
  styleUrls: ['./course-change-list.component.css'],
})
export class CourseChangeListComponent extends BaseComponent implements OnInit {
  protected title = '課程管理';

  courseTestList = [
    { id: '1072H320300', name: '計算機程式及應用' },
    { id: '1072H335700', name: 'VBA巨集開發與應用' },
    { id: '1071H344900', name: '雲端行動應用' },
  ];

  courses: any[];

  ngOnInit() {
    super.setTitle(this.title);
    this.api.serverWork$.subscribe((serverWork: boolean) => {
      if (serverWork) {
        this.courses = this.courseTestList;
      } else {
        this.courses = this.courseTestList;
      }
    });
  }
}
