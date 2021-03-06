import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() {
    this.localStorage = window.localStorage;
  }
  get(key: string): any {
    return JSON.parse(this.localStorage.getItem(key));
  }
  set(key: string, value: any) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
  remove(key: string) {
    this.localStorage.removeItem(key);
  }

  isIn(key, id) {
    const data = this.get(key) || [];
    const filtered: any[] = data.filter((item) => {
      item == id;
    });
    return filtered.length > 0;
  }
}
