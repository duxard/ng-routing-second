import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  users: string[] = ['user-a', 'user-b'];

  get users$(): Observable<string[]> {
    return of(this.users);
  }

  get users2$(): Observable<string[]> {
    return of(this.users);
  }

  set usersSetter(val: []) {
    this.users = val;
  }

  getValue(): string[] {
    return this.users;
  }

  getUsers(): Observable<string[]>{
    return of(this.users);
  }
}
