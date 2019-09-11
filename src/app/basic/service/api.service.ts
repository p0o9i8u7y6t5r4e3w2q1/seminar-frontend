import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenService, TOKEN } from './token.service';
import { map } from 'rxjs/operators';

type InitCallback = (work: boolean, hasToken: boolean) => void;
interface ErrorCallback {
  status: number;
  callback: (error: HttpErrorResponse) => void;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';
  private serverWork: boolean;
  private init = false;
  private initCallbacks: InitCallback[] = [];
  private errorCallbacks: ErrorCallback[] = [];

  private FETCH_TOKEN = map((data: any) => {
    if (data && data[TOKEN]) {
      this.tokenService.token = data[TOKEN];
    }
    console.log(data.result)
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
        this.runCallbacks(this.serverWork);
      },
      error: error => {
        this.serverWork = error.status !== 400 && error.status !== 0;
        this.init = true;
        this.runCallbacks(this.serverWork);
      },
    });
  }

  getStatusAfterInit(callback: InitCallback) {
    if (!this.init) {
      this.initCallbacks.push(callback);
    } else {
      callback(this.serverWork, this.tokenService.hasToken());
    }
  }

  addErrorCallback(
    status: number,
    callback: (error: HttpErrorResponse) => void,
  ) {
    this.errorCallbacks.push({ status, callback });
  }

  private runCallbacks(serverWork: boolean) {
    while (this.initCallbacks.length > 0) {
      const callback = this.initCallbacks.shift();
      callback(serverWork, this.tokenService.hasToken());
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
