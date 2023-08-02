import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Author, BookAuthService } from './book-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorResolver implements Resolve<Author> {
  constructor(private bookAuthService: BookAuthService) {}
  resolve(): Observable<Author> {
    return this.bookAuthService.author$;
  }
}
