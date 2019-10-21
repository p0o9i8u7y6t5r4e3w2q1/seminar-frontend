import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { BaseComponent } from '../../basic';
import { SemesterCourse } from '../../../lib/api-response';

const COURSES$ = 'courses$';

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

  courses$: Observable<SemesterCourse[]>;

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.route.snapshot.params['courseID'];
    if (!this.storage.has(COURSES$)) {
      this.storage.set(
        COURSES$,
        this.api.get(`semester-courses/own`).pipe(shareReplay(1)),
      );
    }
    this.courses$ = this.storage.get(COURSES$);
  }

  protected init() {
    console.log('call init');
  }
}
