import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-general-booking',
  templateUrl: './general-booking.component.html',
  styleUrls: ['./general-booking.component.css'],
})
export class GeneralBookingComponent extends BaseComponent implements OnInit {
  protected title = '非本系生申請借用';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
