import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Author = { name: string; email: string; }

@Injectable({
  providedIn: 'root'
})
export class BookAuthService {
  isAuthenticated$ = of(true);
  author$: Observable<Author> = of({
    name: 'John Doe',
    email: 'doe@gmail.com'
  });
}
