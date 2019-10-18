import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../constant/auth.constant';
import { ROLE } from '../../constant/array.constant';
import { UserService } from '../../service/user.service';

interface MenuItem {
  title: string;
  routerName: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [
    { title: '查詢可借用時段', routerName: '/classroom-schedule' },
    { title: '申請借用教室與設備', routerName: '/booking' },
    { title: '查詢申請進度', routerName: '/query-form' },
    { title: '課程管理', routerName: '/course-change' },
    { title: '審核申請', routerName: '/check-form' },
    { title: '角色管理', routerName: '/role-setting' },
    { title: '學期課程', routerName: '/semester-course' },
    { title: '刷卡紀錄', routerName: '/card-record' },
  ];

  welcomeStr: string;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.userService.isLogin$.subscribe((isLogin: boolean) => {
      if (isLogin) {
        const user = this.userService.getUser();
        this.welcomeStr = `${user.name}  ${ROLE[user.roleID]} 您好！`;
      }
    });
  }

  public display(index: number): boolean {
    switch (index) {
      case 3:
        return this.userService.hasAuth(Auth.COURSE_CHANGE);
      case 4:
        return (
          this.userService.hasAuth(Auth.CHECK_MAKEUP) ||
          this.userService.hasAuth(Auth.CHECK_BOOKING)
        );
      case 5:
        return this.userService.hasAuth(Auth.MEMEBER_MANAGEMENT);
      case 6:
        return this.userService.hasAuth(Auth.SEMESTER_COURSE);
      case 7:
        return this.userService.hasAuth(Auth.CARD_RECORD);
      default:
        return true;
    }
  }

  public isLogin(): boolean {
    return this.userService.hasAuth(Auth.LOGIN);
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
