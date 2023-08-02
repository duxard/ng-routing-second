import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Author } from './book-auth.service';

@Component({
  selector: 'app-book-first',
  styles: [],
  template: `
    <div>Book first</div>
    <div *ngIf="(author$ | async) as author">
      <p>Author: {{author.name}}</p>
      <p>Email: {{author.email}}</p>
    </div>
  `,
})
export class BookFirstComponent  {
  author$: Observable<Author> = inject(ActivatedRoute).data.pipe(map(({author}) => author));
}
