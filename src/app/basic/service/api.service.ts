import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService, TOKEN } from './token.service';
import { map } from 'rxjs/operators';

type InitCallback = () => void;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';
  private serverWork: boolean;
  private init = false;
  private initCallbacks: InitCallback[] = [];

  private FETCH_TOKEN = map((data: any) => {
    if (data && data[TOKEN]) {
      this.tokenService.token = data[TOKEN];
    }
    console.log(data.result);
    return data.result;
  });

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
  ) {
    this.initService();
  }

  initService() {
    this.get('/app').subscribe({
      next: () => {
        this.serverWork = true;
        this.init = true;
        this.runCallbacks();
      },
      error: error => {
        this.serverWork = error.status !== 404 && error.status !== 0;
        this.init = true;
        this.runCallbacks();
      },
    });
  }

  afterInit(callback: () => void) {
    if (!this.init) {
      this.initCallbacks.push(callback);
    } else {
      callback();
    }
  }

  private runCallbacks() {
    while (this.initCallbacks.length > 0) {
      const callback = this.initCallbacks.shift();
      callback();
    }
  }

  isServerWork() {
    return this.serverWork;
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
    if (this.tokenService.hasToken()) {
      options.headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.token,
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
