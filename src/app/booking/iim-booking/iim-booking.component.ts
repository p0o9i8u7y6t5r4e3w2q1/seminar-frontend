import { Component, OnInit } from '@angular/core';
import { BookingComponent } from '../booking.component';
import { Observable } from 'rxjs';
import { CreateIIMBookingFormDto } from '../../../lib/api-request';
import { Person, Classroom } from '../../../lib/api-response';

const FORM_MODAL = 'formModal';

@Component({
  selector: 'app-iim-booking',
  templateUrl: './iim-booking.component.html',
  styleUrls: ['./iim-booking.component.css'],
})
export class IimBookingComponent extends BookingComponent implements OnInit {
  protected title = '本系生申請借用';

  form: CreateIIMBookingFormDto = {
    applicantID: '',
    applicantEmail: '',
    reason: '',
    classroomID: '',
    timeRange: {
      date: null,
      startPeriod: '',
      endPeriod: '',
    },
  };

  applicant$: Observable<Person>;

  ngOnInit() {
    super.setTitle(this.title);
  }

  onSubmit() {
    this.form.equipmentIDs = this.equipCmp.getEquipmentIDs();
    this.api.post('bookings/iim', this.form).subscribe({
      next: form => {
        this.util.modal.setModalData({ formID: form.formID }, FORM_MODAL, true);
        this.util.modal.open(FORM_MODAL);
      },
      error: () => {
        alert('送出失敗');
      },
    });
  }

  fetchApplicant() {
    this.applicant$ = this.api.get(`persons/${this.form.applicantID}`);
  }
}
