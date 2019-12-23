import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../basic';
import { Classroom } from '../../../../lib/api-response';

@Component({
  selector: 'app-time-range-search',
  templateUrl: './time-range-search.component.html',
  styleUrls: ['./time-range-search.component.css'],
})
export class TimeRangeSearchComponent extends BaseComponent implements OnInit {
  protected title = '查詢可借用時段';

  classrooms$: Observable<Array<Classroom & { pending?: boolean }>> = null;

  timeRange = {
    date: null,
    startPeriod: '',
    endPeriod: '',
  };

  ngOnInit() {
    super.setTitle(this.title);
  }

  isTimeComplete(): boolean {
    return (
      this.timeRange.date != null &&
      this.timeRange.startPeriod !== '' &&
      this.timeRange.endPeriod !== ''
    );
  }

  onSubmit() {
    if (!this.isTimeComplete()) {
      alert('請先選擇日期與起始節次，再行查詢');
    } else {
      this.queryClassrooms();
    }
  }

  queryClassrooms() {
    this.classrooms$ = this.api.post(
      `schedule/classroom/available`,
      this.timeRange,
    );
  }
}
