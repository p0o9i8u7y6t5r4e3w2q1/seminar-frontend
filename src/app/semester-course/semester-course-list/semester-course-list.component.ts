import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseComponent, getYearAndSemester } from '../../basic';
import { SemesterCourse } from '../../../lib/api-response';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const STUDENTS_MODAL = 'studentsModal';

@Component({
  selector: 'app-semester-course-list',
  templateUrl: './semester-course-list.component.html',
  styleUrls: ['./semester-course-list.component.css'],
})
export class SemesterCourseListComponent extends BaseComponent
  implements OnInit {
  protected title = '學期課程';

  year: number;
  semester: number;
  semester$: Observable<any>;

  semesterCourses$: Observable<any>;

  ngOnInit() {
    super.setTitle(this.title);
    this.assignYearAndSemester();

    // fetch data from backend
    const params = new HttpParams()
      .set('year', this.year.toString())
      .set('semester', this.semester.toString());

    this.semester$ = this.api.get(`semester`, { params });
    this.semesterCourses$ = this.fromUpdate$(
      switchMap(() => this.api.get(`semester-courses`, { params })),
    );
  }

  assignYearAndSemester() {
    // const { year, semester } = this.storage.get(YearAndSemester);
    const { year, semester } = getYearAndSemester(new Date());
    this.year = year;
    this.semester = semester;
  }

  deleteSemesterCourse(scID: string) {
    this.api.delete(`semester-courses/${scID}`).subscribe(() => {
      alert('刪除成功');
      this.notify(0);
    });
  }

  queryStudents(sc: SemesterCourse) {
    const students$ = this.api.get(`semester-courses/${sc.id}/students`);
    this.util.modal.setModalData(
      { courseName: sc.name, students$ },
      STUDENTS_MODAL,
    );
    this.util.modal.open(STUDENTS_MODAL);
  }
}
