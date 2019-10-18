import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { SemesterCourse } from '../../../lib/api-response';

@Component({
  selector: 'app-course-change-list',
  templateUrl: './course-change-list.component.html',
  styleUrls: ['./course-change-list.component.css'],
})
export class CourseChangeListComponent extends BaseComponent implements OnInit {
  protected title = '課程管理';
  courseID: string;

  courseTestList = [
    { id: '1072H320300', course: '計算機程式及應用' },
    { id: '1072H335700', course: 'VBA巨集開發與應用' },
    { id: '1071H344900', course: '雲端行動應用' },
  ];

  courses: SemesterCourse[];

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.route.snapshot.params['courseID'];
    this.api.get(`semester-courses/own`).subscribe({
      next: (data: SemesterCourse[]) => {
        this.courses = data;
      },
      error: error => {
        alert('課程取得失敗');
      },
    });
  }
}
