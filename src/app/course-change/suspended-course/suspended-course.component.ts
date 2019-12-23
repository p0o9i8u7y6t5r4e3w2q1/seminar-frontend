import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import {
  WEEK,
  BaseComponent,
  mapToArrayObject,
  dateStringRange,
  toDateString,
  setDay,
} from '../../basic';
import { SuspendedCourseDto } from '../../../lib/api-request';
import { SemesterCourse, ScheduleResult } from '../../../lib/api-response';
import { Period } from '../../../lib/constant-manager';
import { Observable, forkJoin } from 'rxjs';
import { map, shareReplay, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-suspended-course',
  templateUrl: './suspended-course.component.html',
  styleUrls: ['./suspended-course.component.css'],
})
export class SuspendedCourseComponent extends BaseComponent implements OnInit {
  protected title = '刪除課程申請';
  // readonly ROOT_URL = 'localhost/3000/course-change';
  readonly week = WEEK;

  courseID: string;
  course$: Observable<SemesterCourse>;
  courseTime$: Observable<any>;

  selectedDate: Date;
  timeCheckBox: { [x: string]: boolean } = {};

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.util.childParam('courseID');
    this.course$ = this.api
      .get(`semester-courses/${this.courseID}`)
      .pipe(shareReplay(1));
    this.fetchCourseTime();
  }

  getSelectedFromAndTo() {
    const from = setDay(this.selectedDate, 0);
    const to = setDay(this.selectedDate, 6);
    return { from, to };
  }

  isValidate() {
    return this.selectedDate && this.selectedDate.toString() > '2018-01-01';
  }

  mapScheduleResult(schedules: ScheduleResult[]) {
    for (const schedule of schedules) {
      const key = schedule.date + schedule.period + schedule.classroomID;
      this.timeCheckBox[key] = false;
    }

    const { from, to } = this.getSelectedFromAndTo();
    const range = dateStringRange(from, to);
    const result = this.mapDateArrayToObject(range, schedules);
    console.log(result);
    return result;
  }

  fetchCourseTime() {
    this.courseTime$ = this.update$.pipe(
      filter(() => this.isValidate()),
      switchMap(() => {
        const { from, to } = this.getSelectedFromAndTo();
        const params = new HttpParams()
          .set('from', toDateString(from))
          .set('to', toDateString(to));

        return this.api.get(`schedule/semester-course/${this.courseID}`, {
          params,
        });
      }),
      map(schedules => this.mapScheduleResult(schedules)),
    );
  }

  private mapDateArrayToObject(range: string[], schedules: ScheduleResult[]) {
    const result: any = {};
    for (const date of range) {
      result[date] = {};
    }

    for (const schedule of schedules) {
      const obj = result[schedule.date];
      if (obj[schedule.period] === undefined) {
        obj[schedule.period] = [];
      }
      obj[schedule.period].push(schedule);
    }
    return result;
  }

  suspendCourse() {
    const bodys = this.makeSuspendedCourseDtos();
    this.callSuspendedCourseApi(bodys);
  }

  makeSuspendedCourseDtos() {
    const bodys: SuspendedCourseDto[] = [];
    const checked: string[] = Object.keys(this.timeCheckBox).filter(
      key => this.timeCheckBox[key],
    );
    const catlogByClassroom: any = mapToArrayObject(checked, key =>
      key.slice(-5),
    );

    for (const classroomID of Object.keys(catlogByClassroom)) {
      const schedules = catlogByClassroom[classroomID];

      let date = schedules[0].slice(0, 10);
      let startIdx = Period.indexOf(schedules[0].slice(10, 11));
      let endIdx = startIdx;
      for (const schedule of schedules) {
        const tmpDate = schedule.slice(0, 10);
        const tmpIdx = Period.indexOf(schedule.slice(10, 11));
        if (date !== tmpDate || tmpIdx - endIdx > 1) {
          bodys.push(this.getDto(classroomID, date, startIdx, endIdx));

          // reset variable
          date = tmpDate;
          startIdx = tmpIdx;
          endIdx = startIdx;
        } else {
          endIdx = tmpIdx;
        }
      }
      bodys.push(this.getDto(classroomID, date, startIdx, endIdx));
    }
    return bodys;
  }

  getDto(classroomID, date, startIdx, endIdx) {
    return {
      classroomID,
      timeRange: {
        date,
        startPeriod: Period[startIdx],
        endPeriod: Period[endIdx],
      },
    };
  }

  callSuspendedCourseApi(bodys: SuspendedCourseDto[]) {
    const requests: any[] = bodys.map(item =>
      this.api.post(`course-change/${this.courseID}/suspended`, item),
    );

    forkJoin(requests).subscribe({
      next: value => {
        alert('完成停課');
        this.fetchCourseTime();
      },
      error: error => {
        console.log(error);
        alert('停課失敗');
      },
    });
  }
}
