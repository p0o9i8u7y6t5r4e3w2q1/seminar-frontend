import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralBookingComponent } from './general-booking/general-booking.component';
import { IimBookingComponent } from './iim-booking/iim-booking.component';
import { NoticeComponent } from './notice/notice.component';
import { BookingRoutingModule } from './booking-routing.module';

@NgModule({
  declarations: [NoticeComponent, GeneralBookingComponent, IimBookingComponent],
  imports: [CommonModule, BookingRoutingModule],
})
export class BookingModule {}
