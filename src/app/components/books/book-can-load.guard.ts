import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { BookAuthService } from './book-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookCanLoadGuard implements CanLoad {
  constructor(
    private bookAuthService: BookAuthService,
    private router: Router
  ) {}
  canLoad(route: Route, segments: UrlSegment[]):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
  {
    return this.bookAuthService.isAuthenticated$.pipe(
      map(isAuthenticated => (isAuthenticated || this.router.createUrlTree([''])))
    );
  }
}
