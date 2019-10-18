import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { CreateGeneralBookingFormDto } from '../../../lib/api-request';

@Component({
  selector: 'app-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: ['./general-booking.component.css'],
})
export class GeneralBookingComponent extends BaseComponent implements OnInit {
  protected title = '非本系生申請借用';

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
}
