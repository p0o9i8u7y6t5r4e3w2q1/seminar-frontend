import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { CreateIIMBookingFormDto } from '../../../lib/api-request';

@Component({
  selector: 'app-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: ['./general-booking.component.css'],
})
export class GeneralBookingComponent extends BaseComponent implements OnInit {
  protected title = '非本系生申請借用';

  form: CreateIIMBookingFormDto = {} as CreateIIMBookingFormDto;

  ngOnInit() {
    super.setTitle(this.title);
  }
}
