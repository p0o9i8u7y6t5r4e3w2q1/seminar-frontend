import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { shareReplay, switchMap, map } from 'rxjs/operators';
import { BaseComponent } from '../../basic';
import { SemesterCourse, Person } from '../../../lib/api-response';
import { RoleType } from '../../../lib/constant-manager';

@Component({
  selector: 'app-ta-setting',
  templateUrl: './ta-setting.component.html',
  styleUrls: ['./ta-setting.component.css'],
})
export class TaSettingComponent extends BaseComponent implements OnInit {
  protected title = '助教管理';

  courseID: string;
  studentID: string; // add ta

  course$: Observable<SemesterCourse>;
  courseTAs$: Observable<Person[]>;
  allTAs$: Observable<Person[]>;
  availableTAs$: Observable<Person[]>;

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.util.childParam('courseID');
    this.course$ = this.api.get(`semester-courses/${this.courseID}`);

    const params = new HttpParams().set('roleIDs', RoleType.TA.toString());
    this.allTAs$ = this.api.get(`users`, { params });
    this.courseTAs$ = this.update$.pipe(
      switchMap(() => this.api.get(`course-change/${this.courseID}/TAs`)),
      shareReplay(1),
    );
    this.availableTAs$ = combineLatest([this.allTAs$, this.courseTAs$]).pipe(
      map(([allTAs, courseTAs]) => {
        return allTAs.filter(ta => !courseTAs.some(cTA => cTA.id === ta.id));
      }),
    );
  }

  addTA() {
    this.api
      .post(`course-change/${this.courseID}/TAs/${this.studentID}`, null)
      .subscribe({
        next: () => {
          alert('新增成功');
          this.notify(0);
        },
        error: error => {
          console.log(error);
          alert('新增失敗');
        },
      });
  }

  removeTA(studentID: string) {
    this.api
      .delete(`course-change/${this.courseID}/TAs/${studentID}`)
      .subscribe({
        next: () => {
          alert('刪除成功');
          this.notify(0);
        },
        error: error => {
          console.log(error);
          alert('刪除失敗');
        },
      });
  }
}
