import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, UnaryFunction } from 'rxjs';
import { UserService } from '../service/user.service';
import { ApiService } from '../service/api.service';
import {
  CLASSROOM_OPTIONS,
  PERIOD_OPTIONS,
  CLASSROOM_NAMES,
  PERIOD_NAMES,
} from '../constant/option.constant';
import { StorageService } from '../service/storage.service';
import { UtilService } from '../service/util.service';
import { Loading } from '../loading';

@Injectable()
export abstract class BaseComponent {
  public readonly classroomOptions = CLASSROOM_OPTIONS;
  public readonly periodOptions = PERIOD_OPTIONS;

  public readonly classroomNames = CLASSROOM_NAMES;
  public readonly periodNames = PERIOD_NAMES;

  // -1 as first number
  readonly FIRST = -1;
  updateSubject: BehaviorSubject<number> = new BehaviorSubject(this.FIRST);
  loading: Loading = new Loading();

  constructor(
    protected readonly router: Router,
    protected readonly userService: UserService,
    protected readonly api: ApiService,
    protected readonly storage: StorageService,
    protected readonly util: UtilService,
  ) {
    this.init();
  }

  public setTitle(title: string) {
    this.util.title.setTitle(title);
  }

  // constructor中初始化，需要在constructor初始化可覆寫此function
  protected init() {}

  // 通用的trackByFn，需自定義可覆寫或寫其他function
  trackByFn(index: any, item: any) {
    return item.id;
  }

  notify(updateCode: number) {
    this.updateSubject.next(updateCode);
  }

  get update$() {
    return this.updateSubject.asObservable();
  }

  fromUpdate$(
    unary: UnaryFunction<any, any>,
    loading?: Loading, // 要通知哪個loading物件使loading畫面顯示，可以不通知
  ): Observable<any> {
    if (loading) {
      return this.update$.pipe(
        tap(() => loading.wait()),
        unary,
        tap(() => loading.complete()),
      );
    } else {
      return this.update$.pipe(unary);
    }
  }
}
