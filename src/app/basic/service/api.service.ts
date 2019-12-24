import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { StorageService, TOKEN } from './storage.service';
import { Observable, UnaryFunction, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventSourcePolyfill } from 'event-source-polyfill';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';
  // public readonly serverWork$: Observable<boolean>;

  private FETCH_TOKEN: UnaryFunction<any, any> = map((data: any) => {
    if (data && data[TOKEN]) {
      this.storage.token = data[TOKEN];
    }
    console.log({ data: (data ? data.result : data) });
    return data ? data.result : data;
  });
  private globalOperations: UnaryFunction<any, any>[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) {
    if (window.location.hostname !== 'localhost') {
      this.baseUrl = 'api';
    }
    /*
    // 只在一開始監測server運作，並且分享檢測結果，不重複檢測
    this.serverWork$ = this.get('/app').pipe(
      timeout(1000),
      map(() => true),
      catchError(error => {
        console.log(error);
        return of(false);
      }),
      shareReplay(1),
    );
     */
  }

  canRetry(error: HttpErrorResponse) {
    return error.status === 401 && this.storage.token;
  }

  registerGlobalOperation(operator: any) {
    this.globalOperations.push(operator);
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

  private pipeGlobalOperations(http: Observable<any>): Observable<any> {
    for (const operation of this.globalOperations) {
      http = http.pipe(operation);
    }
    return http;
  }

  private getAuthorizationHeader() {
    return {
      Authorization: 'Bearer ' + this.storage.token,
    };
  }

  getDefaultOptions() {
    const options: any = {};
    if (this.storage.token) {
      options.headers = new HttpHeaders(this.getAuthorizationHeader());
    }
    return options;
  }

  rawPost(apiName: string, body: any, options?: any) {
    return this.http
      .post(this.getApiUrl(apiName), body, this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  post(apiName: string, body: any, options?: any) {
    return this.pipeGlobalOperations(
      this.rawPost(apiName, body, options).pipe(
        catchError(error =>
          this.canRetry(error)
            ? this.rawPost(apiName, body, options)
            : throwError(error),
        ),
      ),
    );
  }

  rawGet(apiName: string, options?: any) {
    return this.http
      .get(this.getApiUrl(apiName), this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  get(apiName: string, options?: any) {
    return this.pipeGlobalOperations(
      this.rawGet(apiName, options).pipe(
        catchError(error =>
          this.canRetry(error)
            ? this.rawGet(apiName, options)
            : throwError(error),
        ),
      ),
    );
  }

  rawPut(apiName: string, body: any, options?: any) {
    return this.http
      .put(this.getApiUrl(apiName), body, this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  put(apiName: string, body: any, options?: any) {
    return this.pipeGlobalOperations(
      this.rawPut(apiName, body, options).pipe(
        catchError(error =>
          this.canRetry(error)
            ? this.rawPut(apiName, body, options)
            : throwError(error),
        ),
      ),
    );
  }

  rawDelete(apiName: string, options?: any) {
    return this.http
      .delete(this.getApiUrl(apiName), this.mergeOptions(options))
      .pipe(this.FETCH_TOKEN);
  }

  delete(apiName: string, options?: any) {
    return this.pipeGlobalOperations(
      this.rawDelete(apiName, options).pipe(
        catchError(error =>
          this.canRetry(error)
            ? this.rawDelete(apiName, options)
            : throwError(error),
        ),
      ),
    );
  }

  eventSource(apiName: string): EventSourcePolyfill {
    return new EventSourcePolyfill(this.getApiUrl(apiName), {
      headers: this.getAuthorizationHeader(),
    });
  }
}
