import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { BaseComponent, Auth } from '../../basic';
import { Form } from '../../../lib/api-response';

const BOOKING = 1;
const MAKEUPCOURSE = 0;
@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent extends BaseComponent implements OnInit {
  protected title = '審核申請';

  makeupAuth = true;
  bookingAuth = true;

  makeups$: Observable<any[]>;
  bookings$: Observable<any[]>;

  ngOnInit() {
    super.setTitle(this.title);
    this.userService.isLogin$.subscribe(() => {
      this.setAuth();
      this.fetchMakeupForms();
      this.fetchBookingForms();
    });
  }

  setAuth() {
    this.makeupAuth = this.userService.hasAuth(Auth.CHECK_MAKEUP);
    this.bookingAuth = this.userService.hasAuth(Auth.CHECK_BOOKING);
  }

  fetchMakeupForms() {
    if (this.makeupAuth) {
      this.makeups$ = this.update$.pipe(
        filter(code => code === MAKEUPCOURSE),
        switchMap(() => this.api.get('course-change/makeup/pending')),
      );
    }
  }

  fetchBookingForms() {
    if (this.bookingAuth) {
      this.bookings$ = this.update$.pipe(
        filter(code => code === BOOKING),
        switchMap(() => this.api.get('bookings/pending')),
      );
    }
  }

  checkBookingForm(formID: string, isApproved: boolean) {
    this.api.put(`bookings/${formID}/check`, { isApproved }).subscribe(data => {
      this.notify(BOOKING);
      alert('成功');
    });
  }

  checkMakeupForm(formID: string, isApproved: boolean) {
    this.api
      .put(`course-change/makeup/${formID}/check`, { isApproved })
      .subscribe(data => {
      this.notify(MAKEUPCOURSE);
      alert('成功');
      });
  }
}
