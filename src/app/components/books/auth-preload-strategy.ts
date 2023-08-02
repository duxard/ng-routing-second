import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookAuthService } from './book-auth.service';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthPreloadStrategy implements PreloadingStrategy {
  constructor(private bookAuthService: BookAuthService) {}
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return this.bookAuthService.isAuthenticated$.pipe(
      switchMap(isAuth => isAuth && route.data?.preload ? fn() : of(null))
    );
  }
}
