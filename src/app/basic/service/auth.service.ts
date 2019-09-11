import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../constant/auth.constant';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { of, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface User {
  id: string;
  email: string;
  name: string;
  roleID: number;
  authIDs: Auth[];
}

type UserCallback = (user: User) => void;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auths: boolean[] = new Array<boolean>(8);
  private userCallbacks: UserCallback[] = [];
  private user: User;
  private init = false;

  public NOT_LOGIN_HANDLE = catchError(error => {
    if (error === 401) {
      this.notLogin();
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
    this.tokenService.removeToken();
    this.clearUser();
  }
  /* end of test */

  constructor(
    private readonly api: ApiService,
    private readonly tokenService: TokenService,
    protected readonly router: Router,
  ) {
    this.api.getStatusAfterInit((serverWork: boolean, hasToken: boolean) => {
      if (serverWork && hasToken) {
        this.fetchUser();
      } else if (!serverWork) {
        this.login = this.loginTest;
        this.logout = this.logoutTest;
        alert(
          '沒有開啟server，有以下使用者可作測試：\n' +
            '1. 帳號：D54051365, 密碼：0000, 姓名：賈柱轎, 身份：助教\n' +
            '2. 帳號：z1000022,  密碼：0000, 姓名：劉任修, 身份：教授\n' +
            '3. 帳號：z1000002,  密碼：0000, 姓名：王惠嘉, 身份：系主任\n' +
            '4. 帳號：z0000002,  密碼：0000, 姓名：陳賢豪, 身份：系辦\n',
        );
        this.init = true;
      }
    });
  }

  fetchUser() {
    this.api.get('/user/userInfo').subscribe({
      next: (data: any) => {
        this.setUser(data);
        this.init = true;
        this.runCallbacks(this.user);
      },
      error: error => {
        console.log(error);
        this.init = true;
        this.runCallbacks(this.user);
      },
    });
  }

  login(userID: string, password: string): Observable<any> {
    return this.api
      .post('/user/login', { userID, password })
      .pipe(tap(user => this.setUser(user)));
  }

  logout() {
    this.api.post('/user/logout', null).subscribe({
      error: error => {
        console.log(error);
      },
    });
    this.tokenService.removeToken();
    this.clearUser();
  }

  private setUser(user: User) {
    console.log({user})
    this.user = user;
    this.setAuths(this.user.authIDs);
    this.auths[Auth.LOGIN] = true;
  }

  getUser() {
    return this.user;
  }

  private clearUser() {
    this.auths.fill(false);
    this.user = null;
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
    if (this.auths[Auth.LOGIN]) {
      // 因為無動作而讓token過期
      this.clearUser();
      this.tokenService.removeToken();
      alert('過久無動作，請重新登入');
      this.router.navigate(['/login']);
    } else if (!this.tokenService.hasToken()) {
      // 尚未登入，卻到需要登入的部份
      alert('此部份需登入才能操作');
      this.router.navigate(['/login']);
    }
  }

  private noAuth() {
    alert('你無權限訪問此頁面');
    this.router.navigate(['/']);
  }

  private runCallbacks(user: User) {
    while (this.userCallbacks.length > 0) {
      const callback = this.userCallbacks.shift();
      callback(user);
    }
  }

  getUserAfterInit(callback: UserCallback) {
    if (!this.init) {
      this.userCallbacks.push(callback);
    } else {
      callback(this.user);
    }
  }
}
