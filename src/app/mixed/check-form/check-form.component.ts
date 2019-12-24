import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, filter, shareReplay } from 'rxjs/operators';
import { BaseComponent, Auth } from '../../basic';
import { Form } from '../../../lib/api-response';

const BOOKING = 1;
const MAKEUPCOURSE = 0;
const PENDING_COUNT = 'pending_count';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent extends BaseComponent
  implements OnInit, OnDestroy {
  protected title = '審核申請';

  makeupAuth = false;
  bookingAuth = false;

  makeups$: Observable<any[]>;
  bookings$: Observable<any[]>;

  subscription: Subscription = null;

  ngOnInit() {
    super.setTitle(this.title);
    this.subscription = this.storage.get(PENDING_COUNT).subscribe(count => {
      /*
      this.notify(MAKEUPCOURSE);
      this.notify(BOOKING);
       */
      this.notify(1);
    });

    this.userService.isLogin$.subscribe(isLogin => {
      if (isLogin) {
        this.setAuth();
        this.fetchMakeupForms();
        this.fetchBookingForms();
      } else {
        // alert('尚未登入，請登入後再操作');
        // this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setAuth() {
    this.makeupAuth = this.userService.hasAuth(Auth.CHECK_MAKEUP);
    this.bookingAuth = this.userService.hasAuth(Auth.CHECK_BOOKING);
  }

  fetchMakeupForms() {
    if (this.makeupAuth) {
      this.makeups$ = this.update$.pipe(
        switchMap(() => this.api.get('course-change/makeup/pending')),
        shareReplay(1),
      );
    }
  }

  fetchBookingForms() {
    if (this.bookingAuth) {
      this.bookings$ = this.update$.pipe(
        switchMap(() => this.api.get('bookings/pending')),
        shareReplay(1),
      );
    }
  }

  checkBookingForm(formID: string, isApproved: boolean) {
    this.api.put(`bookings/${formID}/check`, { isApproved }).subscribe(data => {
      // this.notify(BOOKING);
      alert('成功');
    });
  }

  checkMakeupForm(formID: string, isApproved: boolean) {
    this.api
      .put(`course-change/makeup/${formID}/check`, { isApproved })
      .subscribe(data => {
        // this.notify(MAKEUPCOURSE);
        alert('成功');
      });
  }

  trackByFn(item: any){
    return item.formID;
  }
}
