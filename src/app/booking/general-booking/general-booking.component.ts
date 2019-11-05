import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingComponent } from '../booking.component';
import { CreateGeneralBookingFormDto } from '../../../lib/api-request';
import { Classroom } from '../../../lib/api-response';

const FORM_MODAL = 'formModal';

@Component({
  selector: 'app-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: ['./general-booking.component.css'],
})
export class GeneralBookingComponent extends BookingComponent
  implements OnInit {
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

  // to show selected classroom info
  classroom$: Observable<Classroom>;
  classroomConflict$: Observable<boolean>;

  ngOnInit() {
    super.setTitle(this.title);
  }

  onSubmit() {
    this.api.post('/bookings/general', this.form).subscribe({
      next: form => {
        this.util.modal.setModalData({ formID: form.formID }, FORM_MODAL, true);
        this.util.modal.open(FORM_MODAL);
      },
      error: error => {
        console.log(error);
        alert('送出失敗');
      },
    });
  }
}
