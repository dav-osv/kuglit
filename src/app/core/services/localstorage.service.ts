import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  set(key: string, data: object): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log('Error setting key :>> ', error);
    }
  }

  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (error) {
      console.log('Error getting key :>> ', error);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing key :>> ', error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error cleaning key :>> ', error);
    }
  }
}
