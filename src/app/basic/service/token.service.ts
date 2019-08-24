import { Injectable } from '@angular/core';

export const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _token: string;

  constructor() {
    this._token = this.readToken();
  }

  set token(token: string) {
    this._token = token;
    token ? this.writeToken() : this.removeToken();
  }

  get token() {
    return this._token;
  }

  hasToken(): boolean {
    return this._token != null;
  }

  private readToken() {
    return localStorage.getItem(TOKEN);
  }

  private writeToken() {
    return localStorage.setItem(TOKEN, this._token);
  }

  removeToken() {
    localStorage.removeItem(TOKEN);
  }
}
