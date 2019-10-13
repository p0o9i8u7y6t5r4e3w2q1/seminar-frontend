import { GeneralBookingComponent } from './general-booking/general-booking.component';
import { IimBookingComponent } from './iim-booking/iim-booking.component';
import { NoticeComponent } from './notice/notice.component';
import { Routes } from '@angular/router';

export const BookingComponents = [
  NoticeComponent,
  GeneralBookingComponent,
  IimBookingComponent,
];

export const BookingRoutes: Routes = [
  { path: 'booking', component: NoticeComponent },
  { path: 'booking/iim', component: IimBookingComponent },
  { path: 'booking/general', component: GeneralBookingComponent },
];
