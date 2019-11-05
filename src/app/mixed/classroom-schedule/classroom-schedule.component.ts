import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { BaseComponent, WEEK } from '../../basic';
import { ClassroomDateSchedule } from '../../../lib/api-response';
import * as moment from 'moment';

@Component({
  selector: 'app-classroom-schedule',
  templateUrl: './classroom-schedule.component.html',
  styleUrls: ['./classroom-schedule.component.css'],
})
export class ClassroomScheduleComponent extends BaseComponent
  implements OnInit {
  protected title = '查詢可借用時段';
  public readonly week = WEEK;

  classroomID = '';
  date: Date = null;

  schedules$: Observable<ClassroomDateSchedule[]>;

  ngOnInit() {
    super.setTitle(this.title);
  }

  onSubmit() {
    if (this.classroomID === '' || this.date == null) {
      alert('請先選擇日期與教室，再行查詢');
    } else {
      this.querySchedule();
    }
  }

  querySchedule() {
    const from: string = moment(this.date)
      .weekday(0)
      .toString();
    const to: string = moment(this.date)
      .weekday(6)
      .toString();
    console.log({ from: from.toString(), to: to.toString() });
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('classroomID', this.classroomID);
    this.schedules$ = this.api
      .get(`schedule/classroom/${this.classroomID}`, {
        params,
      })
      .pipe(shareReplay(1));
  }
}
