import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { BaseComponent } from '../../basic';
import { SemesterCourse } from '../../../lib/api-response';

const COURSES$ = 'courses$';
const HISTORY_MODAL = 'historyModal';

@Component({
  selector: 'app-course-change-list',
  templateUrl: './course-change-list.component.html',
  styleUrls: ['./course-change-list.component.css'],
})
export class CourseChangeListComponent extends BaseComponent implements OnInit {
  protected title = '課程管理';
  courseID: string;

  courses$: Observable<SemesterCourse[]>;

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.util.param('courseID');
    this.courses$ = this.api.get(`semester-courses/own`).pipe(shareReplay(1));
  }

  openHistoryModal(course: SemesterCourse) {
    const obj = {
      courseName: course.name,
      history$: this.api
        .get(`course-change/${course.id}/history`)
        .pipe(map((result: any[]) => (result.length > 0 ? result : undefined))),
      // map [] to undefined for ngIf
    };

    this.util.modal.setModalData(obj, HISTORY_MODAL, true);
    this.util.modal.open(HISTORY_MODAL);
  }
}
