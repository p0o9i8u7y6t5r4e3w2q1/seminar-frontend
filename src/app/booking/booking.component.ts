import { ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { BaseComponent } from '../basic';
import { EquipmentComponent } from './equipment/equipment.component';
import { Classroom } from '../../lib/api-response';

export abstract class BookingComponent extends BaseComponent {
  @ViewChild(EquipmentComponent, { static: false })
  equipCmp: EquipmentComponent;

  // just a template, not actually form memeber
  form: any = {
    timeRange: {
      date: null,
      startPeriod: '',
      endPeriod: '',
    },
  };

  // to show selected classroom info
  classroom$: Observable<Classroom>;
  classroomConflict$: Observable<boolean>;

  timeOnChange() {
    this.equipCmp.updateAllTypeEquipOptions();
    this.fetchClassroomConflict();
  }

  classroomOnChange() {
    this.fetchClassroom();
    this.fetchClassroomConflict();
  }

  fetchClassroom() {
    this.classroom$ = this.api
      .get(`classrooms/${this.form.classroomID}`)
      .pipe(shareReplay(1));
  }

  fetchClassroomConflict() {
    /*
    if (this.isTimeComplete() && this.form.classroomID !== '') {
      this.classroomConflict$ = this.api.post(
        `schedule/classroom/${this.form.classroomID}/conflict`,
        this.form.timeRange,
      );
    }
     */
  }

  isTimeComplete(): boolean {
    console.log();
    return (
      this.form.timeRange.date != null &&
      this.form.timeRange.startPeriod !== '' &&
      this.form.timeRange.endPeriod !== ''
    );
  }

  goBack() {
    this.router.navigate(['booking']);
  }
}
