import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Auth } from '../constant/auth.constant';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { of, throwError, Observable, ReplaySubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../../../lib/api-response';

const NOT_LOGGED_IN_MEG = 'Not Logged In';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auths: boolean[] = new Array<boolean>(8);
  private user: User = null;
  isLoginSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  public NOT_LOGGED_IN_HANDLE = catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      console.log('need login');
      this.notLogin();
      this.clearUser();
      return of([]);
    }
    return throwError(error);
  });

  public NO_AUTH_HANDLE = catchError(error => {
    if (error === 403) {
      this.noAuth();
      return of([]);
    }
    return throwError(error);
  });

  /* for test */
  private testUser: any[] = [
    {
      id: 'D54051365',
      password: '0000',
      email: 'D54051365@mail.ncku.edu.tw',
      name: '賈柱轎',
      roleID: 1,
      authIDs: [1],
    },
    {
      id: 'z1000022',
      password: '0000',
      email: 'rsliu@mail.ncku.edu.tw',
      name: '劉任修',
      roleID: 2,
      authIDs: [1, 2],
    },
    {
      id: 'z1000002',
      password: '0000',
      email: 'hcwang@mail.ncku.edu.tw',
      name: '王惠嘉',
      roleID: 3,
      authIDs: [1, 2, 3],
    },
    {
      id: 'z0000002',
      password: '0000',
      email: 'em53100@email.ncku.edu.tw',
      name: '陳賢豪',
      roleID: 4,
      authIDs: [1, 2, 3, 4, 5, 6, 7],
    },
  ];

  loginTest(userID: string, password: string): Observable<any> {
    for (const user of this.testUser) {
      if (user.id === userID && user.password === password) {
        this.setUser(user);
        return of(user);
      }
    }
    return throwError(new Error('not allow'));
  }

  logoutTest() {
    this.clearUser();
  }
  /* end of test */

  constructor(
    private readonly api: ApiService,
    private readonly storage: StorageService,
    protected readonly router: Router,
  ) {
    if (this.storage.token) {
      this.fetchUser();
    }
    this.api.registerGlobalOperation(this.NOT_LOGGED_IN_HANDLE);

    /*
    this.api.serverWork$.subscribe((serverWork: boolean) => {
      if (serverWork && this.storage.token) {
        this.fetchUser();
      } else if (serverWork) {
        this.isLoginSubject.next(false);
      } else {
        this.login = this.loginTest;
        this.logout = this.logoutTest;
        alert(
          '沒有開啟server，有以下使用者可作測試：\n' +
            '1. 帳號：D54051365, 密碼：0000, 姓名：賈柱轎, 身份：助教\n' +
            '2. 帳號：z1000022,  密碼：0000, 姓名：劉任修, 身份：教授\n' +
            '3. 帳號：z1000002,  密碼：0000, 姓名：王惠嘉, 身份：系主任\n' +
            '4. 帳號：z0000002,  密碼：0000, 姓名：陳賢豪, 身份：系辦\n',
        );
        this.isLoginSubject.next(false);
      }
    });
    */
  }

  fetchUser() {
    this.api.rawGet('/user/info').subscribe({
      next: (data: User) => this.setUser(data),
      // 第一次取得使用者資料失敗，不必顯示尚未登入資訊
      error: error => this.clearUser(),
    });
  }

  login(userID: string, password: string): Observable<any> {
    return this.api
      .rawPost('/user/login', { userID, password })
      .pipe(tap(data => this.setUser(data)));
  }

  logout() {
    this.api.rawPost('/user/logout', null).subscribe({
      error: error => {
        console.log(error);
      },
    });
    this.clearUser();
    this.router.navigate(['/']);
  }

  private setUser(user: User) {
    this.user = user;
    this.setAuths(this.user.authIDs);
    this.auths[Auth.LOGIN] = true;
    this.isLoginSubject.next(true);
  }

  private clearUser() {
    this.auths.fill(false);
    this.user = null;
    this.storage.token = null;
    this.isLoginSubject.next(false);
  }

  getUser() {
    return this.user;
  }

  private setAuths(auths: Auth[]) {
    for (const authIdx of auths) {
      this.auths[authIdx] = true;
    }
  }

  hasAuth(authIdx: Auth): boolean {
    return this.auths[authIdx];
  }

  private notLogin() {
    if (this.storage.token) {
      alert('登入已過期，請重新登入');
    } else {
      alert('尚未登入，請登入後再操作');
    }
    this.router.navigate(['/login']);
  }

  private noAuth() {
    alert('你無權限訪問此頁面');
    this.router.navigate(['/']);
  }

  get isLogin$(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
}
