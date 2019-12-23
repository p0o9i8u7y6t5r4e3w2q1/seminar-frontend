import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { BaseComponent, WEEK, toDateString, setDay } from '../../../basic';
import { ClassroomDateSchedule } from '../../../../lib/api-response';

@Component({
  selector: 'app-classroom-schedule',
  templateUrl: './classroom-week-search.component.html',
  styleUrls: ['./classroom-week-search.component.css'],
})
export class ClassroomWeekSearchComponent extends BaseComponent
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
    const from: string = toDateString(setDay(new Date(this.date), 0));
    const to: string = toDateString(setDay(new Date(this.date), 6));
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
