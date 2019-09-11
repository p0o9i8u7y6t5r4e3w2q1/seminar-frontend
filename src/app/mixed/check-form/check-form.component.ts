import { Component, OnInit } from '@angular/core';
import { BaseComponent, Auth } from '../../basic';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.css'],
})
export class CheckFormComponent extends BaseComponent implements OnInit {
  protected title = '借用審核';

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

  bookingTestList = [{}];

  makeupAuth = false;
  bookingAuth = false;

  makeups: any[];
  bookings: any[];

  ngOnInit() {
    super.setTitle(this.title);
    this.authService.getUserAfterInit(user => {
      this.makeupAuth = this.authService.hasAuth(Auth.CHECK_MAKEUP);
      this.bookingAuth = this.authService.hasAuth(Auth.CHECK_BOOKING);
    });

    this.makeups = this.makeupTestList;
  }
}
