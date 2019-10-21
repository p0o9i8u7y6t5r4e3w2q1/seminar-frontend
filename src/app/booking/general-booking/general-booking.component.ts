import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import { EquipmentComponent } from '../equipment/equipment.component';
import { BaseComponent } from '../../basic';
import { CreateGeneralBookingFormDto } from '../../../lib/api-request';
import { Classroom } from '../../../lib/api-response';

@Component({
  selector: 'app-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: ['./general-booking.component.css'],
})
export class GeneralBookingComponent extends BaseComponent implements OnInit {
  protected title = '非本系生申請借用';

  @ViewChild(EquipmentComponent, { static: false })
  equipCmp: EquipmentComponent;

  form: CreateGeneralBookingFormDto = {
    applicantName: '',
    applicantEmail: '',
    reason: '',
    classroomID: '',
    timeRange: {
      date: null,
      startPeriod: '',
      endPeriod: '',
    },
  };

  // to show selected classroom info
  classroom$: Observable<Classroom>;

  ngOnInit() {
    super.setTitle(this.title);
  }

  onSubmit() {
    this.api.post('/bookings/general', this.form).subscribe({
      next: () => {
        alert('送出成功');
      },
      error: error => {
        console.log(error);
        alert('送出失敗');
      },
    });
  }

  fetchClassroomInfo() {
    this.classroom$ = this.api
      .get(`classrooms/${this.form.classroomID}`)
      .pipe(shareReplay(1));
  }

  timeOnChange() {
    this.equipCmp.updateAllTypeEquipOptions();
  }
}
