import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth } from '../../constant/auth.constant';
import { RoleType } from '../../../../lib/constant-manager';
import { UserService } from '../../service/user.service';
import { ApiService } from '../../service/api.service';
import { StorageService } from '../../service/storage.service';

interface MenuItem {
  title: string;
  routerName: string;
}

const PENDING_COUNT = 'pending_count';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
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

  isLogin$: Observable<boolean>;
  user: any;
  pendingUpdate$ = new ReplaySubject(1);
  pendingCount: string = '0';
  source: EventSource;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    protected readonly api: ApiService,
    protected readonly storage: StorageService,
  ) {
    this.storage.set(PENDING_COUNT, this.pendingUpdate$);
  }

  ngOnInit() {
    this.isLogin$ = this.userService.isLogin$.pipe(
      tap((isLogin: boolean) => {
        if (isLogin) {
          this.user = this.userService.getUser();
          this.setPendingCount();
        } else {
          if (this.source) {
            this.source.close();
          }
          this.user = null;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.source.close();
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

  public hasPending(): boolean {
    return this.pendingCount !== '0';
  }

  public isLogin(): boolean {
    return this.userService.hasAuth(Auth.LOGIN);
  }

  public logout() {
    this.userService.logout();
    this.source.close();
    this.source = null;
    this.router.navigate(['/']);
  }

  public setPendingCount() {
    if (
      this.user.roleID === RoleType.TA ||
      this.user.roleID === RoleType.Teacher
    ) {
      return;
    }

    this.source = this.api.eventSource('sse/forms/count');
    this.source.addEventListener('message', (evt: any) => {
      console.log({ sse: evt.data });
      this.pendingCount = evt.data;
      this.pendingUpdate$.next(this.pendingCount);
    });
    this.source.addEventListener('error', (error: any) => {
      console.log(error);
      this.source.close();
    });
  }
}
