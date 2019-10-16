import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { StorageService, TOKEN } from './storage.service';
import { of, Observable } from 'rxjs';
import { map, shareReplay, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';
  public readonly serverWork$: Observable<boolean>;

  private FETCH_TOKEN = map((data: any) => {
    if (data && data[TOKEN]) {
      this.storage.token = data[TOKEN];
    }
    console.log(data.result);
    return data.result;
  });

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) {
    // 只在一開始監測server運作，並且分享檢測結果，不重複檢測
    this.serverWork$ = this.get('/app').pipe(
      timeout(700),
      map(() => true),
      catchError(error => {
        console.log(error);
        return of(false);
      }),
      shareReplay(1),
    );
  }

  getApiUrl(apiName: string) {
    if (apiName.startsWith('http')) {
      return apiName;
    } else if (apiName.startsWith('/')) {
      return this.baseUrl + apiName;
    } else {
      return this.baseUrl + '/' + apiName;
    }
  }

  mergeOptions(options?: any): any {
    return Object.assign({}, this.getDefaultOptions(), options);
  }

  getDefaultOptions() {
    const options: any = {};
    if (this.storage.token) {
      options.headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.storage.token,
      });
    }
    return options;
  }

  post(apiName: string, body: any, options?: any) {
    return this.http
      .post(this.getApiUrl(apiName), body, this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  get(apiName: string, options?: any) {
    return this.http
      .get(this.getApiUrl(apiName), this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  put(apiName: string, body: any, options?: any) {
    return this.http
      .put(this.getApiUrl(apiName), body, this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  delete(apiName: string, options?: any) {
    return this.http
      .delete(this.getApiUrl(apiName), this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }
}
