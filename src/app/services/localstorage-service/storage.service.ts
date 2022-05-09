import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor() {
  }

  public setItem<T>(key: string, item: T) {
    localStorage.setItem(key, JSON.stringify(item))
  }

  public getItem(key: string): any {
    let item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return '';
  }

}
