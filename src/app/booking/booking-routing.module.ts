import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticeComponent } from './notice/notice.component';
import { IimBookingComponent } from './iim-booking/iim-booking.component';
import { GeneralBookingComponent } from './general-booking/general-booking.component';

const bookingRoutes: Routes = [
  { path: 'booking', component: NoticeComponent },
  { path: 'booking/iim', component: IimBookingComponent },
  { path: 'booking/general', component: GeneralBookingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(bookingRoutes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
