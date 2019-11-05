import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';

// 將不常用到的service放在一起，需要時從此處取用
// 並加入一些方便性的function
@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor(
    public readonly title: Title,
    public readonly route: ActivatedRoute,
    public readonly modal: NgxSmartModalService,
    public readonly spinner: NgxSpinnerService,
  ) {}

  param(key: string) {
    return this.route.snapshot.paramMap.get(key);
  }

  childParam$(key: string): Observable<string> {
    return this.route.firstChild.paramMap.pipe(map(params => params.get(key)));
  }

  childParam(key: string) {
    return this.route.snapshot.firstChild.paramMap.get(key);
  }
}
