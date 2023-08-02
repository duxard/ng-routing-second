import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { BookAuthService } from './book-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookGuard implements CanActivate {
  constructor(private bookAuthService: BookAuthService) {}
  canActivate(): Observable<boolean> {
    return this.bookAuthService.isAuthenticated$;
  }
}
