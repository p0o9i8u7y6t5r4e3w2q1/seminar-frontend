import { Injectable } from '@angular/core';

export const TOKEN = 'token';

// 格外管理token，會存在localstorage裡
// 保存公共東西，方便取用，不會存在localstorage裡
// 未來考慮添加永久保存功能
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _token: string;
  private storage: any = {};

  constructor() {
    this._token = this.read(TOKEN);
  }

  set token(token: string) {
    this._token = token;
    token ? this.write(TOKEN, token) : this.remove(TOKEN);
  }

  get token() {
    return this._token;
  }

  private read(key: string): any {
    return localStorage.getItem(key);
  }

  private write(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  private remove(key: string) {
    localStorage.removeItem(key);
  }

  set(key: string, value: any) {
    this.storage[key] = value;
  }

  get(key: string): any {
    return this.storage[key];
  }

  delete(key: string) {
    delete this.storage[key];
  }

  has(key: string): boolean {
    return this.storage[key] != null;
  }
}
