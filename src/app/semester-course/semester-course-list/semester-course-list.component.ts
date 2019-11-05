import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseComponent, getYearAndSemester } from '../../basic';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
}
