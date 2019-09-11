import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { Auth } from '../../constant/auth.constant';

interface MenuItem {
  title: string;
  routerName: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  menuItems: MenuItem[] = [
    { title: '查詢可借用時段', routerName: '/classroom-schedule' },
    { title: '申請借用教室與設備', routerName: '/booking' },
    { title: '查詢申請進度', routerName: '/query-form' },
    { title: '課程管理', routerName: '/course-change' },
    { title: '借用審核', routerName: '/check-form' },
    { title: '角色管理', routerName: '/role-setting' },
    { title: '學期課程', routerName: '/semester-course' },
    { title: '刷卡紀錄', routerName: '/card-record' },
  ];

  welcomeStr: string;

  ngOnInit() {
    this.authService.getUserAfterInit(user => {
      this.welcomeStr =
        user.name + ' ' + this.getRoleName(user.roleID) + ' 您好！';
    });
  }

  getRoleName(type: number) {
    switch (type) {
      case 1:
        return '助教';
      case 2:
        return '教授';
      case 3:
        return '系主任';
      case 4:
        return '系辦人員';
    }
  }

  public display(index: number): boolean {
    switch (index) {
      case 3:
        return this.authService.hasAuth(Auth.COURSE_CHANGE);
      case 4:
        return (
          this.authService.hasAuth(Auth.CHECK_MAKEUP) ||
          this.authService.hasAuth(Auth.CHECK_BOOKING)
        );
      case 5:
        return this.authService.hasAuth(Auth.MEMEBER_MANAGEMENT);
      case 6:
        return this.authService.hasAuth(Auth.SEMESTER_COURSE);
      case 7:
        return this.authService.hasAuth(Auth.CARD_RECORD);
      default:
        return true;
    }
  }

  public isLogin(): boolean {
    return this.authService.hasAuth(Auth.LOGIN);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
