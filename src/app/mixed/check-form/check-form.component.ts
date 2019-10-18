import { Component, OnInit } from '@angular/core';
import { BaseComponent, Auth } from '../../basic';
import { take } from 'rxjs/operators';
import { Form } from '../../../lib/api-response';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent extends BaseComponent implements OnInit {
  protected title = '審核申請';

  makeupTestList = [
    {
      applicantRole: '教授',
      applicant: 'z1000002',
      course: '資料結構',
      classroomID: '61101',
      timeRange: {
        date: new Date('2019-07-03'),
        startPeriod: '7',
        endPeriod: '9',
      },
    },
    {
      applicantRole: '學生',
      applicant: 'H34054087',
      course: '工程經濟',
      classroomID: '61202',
      timeRange: {
        date: new Date('2019-09-03'),
        startPeriod: '2',
        endPeriod: '3',
      },
    },
  ];

  bookingTestList = [
    {
      applicantRole: '學生',
      applicantID: 'H34055041',
      reason: '開趴',
      classroomID: '61101',
      equipments: ['投影機', '小蜜蜂'],
      timeRange: {
        date: new Date('2019-07-03'),
        startPeriod: '7',
        endPeriod: '9',
      },
    },
    {
      applicantRole: '學生',
      applicantID: 'H34054087',
      reason: '系學會大會',
      classroomID: '61102',
      equipments: null,
      timeRange: {
        date: new Date('2019-09-04'),
        startPeriod: '6',
        endPeriod: '8',
      },
    },
  ];

  makeupAuth: boolean = true;
  bookingAuth: boolean = true;

  makeups: any[];
  bookings: any[];

  ngOnInit() {
    super.setTitle(this.title);
    this.userService.isLogin$.pipe(take(1)).subscribe(() => {
      this.setAuth();
      this.fetchPendingForms();
    });

    this.makeups = this.makeupTestList;
    this.bookings = this.bookingTestList;
  }

  setAuth() {
    this.makeupAuth = this.userService.hasAuth(Auth.CHECK_MAKEUP);
    this.bookingAuth = this.userService.hasAuth(Auth.CHECK_BOOKING);
  }

  fetchPendingForms() {
    if (this.makeupAuth) {
      // this.api.get('');
    }
    if (this.bookingAuth) {
      this.api.get('bookings/pending').subscribe((data: Form[]) => {
        this.bookings = data;
      });
    }
  }

  checkBookingForm(i: number, isApproved: boolean) {
    const form = this.bookings[i];
    this.api.put(`bookings/${form.id}`, { isApproved }).subscribe(data => {
      alert('成功');
    });
  }

  checkMakeupForm(i: number, isApproved: boolean) {
    const form = this.makeups[i];
    this.api
      .put(`course-change/makeup/${form.id}`, { isApproved })
      .subscribe(data => {
        alert('成功');
      });
  }
}
