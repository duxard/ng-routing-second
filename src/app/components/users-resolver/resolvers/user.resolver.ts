import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { UsersService } from '../services/users.service';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<boolean> {
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.usersService.fetchUser(route.params?.id).pipe(
      delay(3000),
      catchError((err, caught) => {
        console.error(err);
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
