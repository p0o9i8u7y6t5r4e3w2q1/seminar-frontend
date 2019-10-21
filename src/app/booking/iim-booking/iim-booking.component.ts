import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../basic';
import { Observable } from 'rxjs';
import { CreateIIMBookingFormDto } from '../../../lib/api-request';
import { Person, Classroom } from '../../../lib/api-response';
import { EquipmentComponent } from '../equipment/equipment.component';

@Component({
  selector: 'app-iim-booking',
  templateUrl: './iim-booking.component.html',
  styleUrls: ['./iim-booking.component.css'],
})
export class IimBookingComponent extends BaseComponent implements OnInit {
  protected title = '本系生申請借用';

  @ViewChild(EquipmentComponent, { static: false })
  equipCmp: EquipmentComponent;

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
  classroom$: Observable<Classroom>;

  ngOnInit() {
    super.setTitle(this.title);
  }

  onSubmit() {
    this.form.equipmentIDs = this.equipCmp.getEquipmentIDs();
    this.api.post('bookings/iim', this.form).subscribe({
      next: () => {
        alert('送出成功');
      },
      error: () => {
        alert('送出失敗');
      },
    });
  }

  timeOnChange() {
    this.equipCmp.updateAllTypeEquipOptions();
  }

  fetchApplicant() {
    this.applicant$ = this.api.get(`persons/${this.form.applicantID}`);
  }

  fetchClassroom() {
    this.classroom$ = this.api.get(`classrooms/${this.form.classroomID}`);
  }
}
