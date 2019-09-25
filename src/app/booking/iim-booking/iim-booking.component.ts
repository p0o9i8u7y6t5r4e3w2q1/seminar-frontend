import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { CreateIIMBookingFormDto } from '../../../lib/api-request';

@Component({
  selector: 'app-iim-booking',
  templateUrl: './iim-booking.component.html',
  styleUrls: ['./iim-booking.component.css'],
})
export class IimBookingComponent extends BaseComponent implements OnInit {
  protected title = '本系生申請借用';

  form: CreateIIMBookingFormDto = {} as CreateIIMBookingFormDto;

  ngOnInit() {
    super.setTitle(this.title);
  }
}
