import { Component, inject } from '@angular/core';
import { Author } from './book-auth.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-second',
  styles: [],
  template:`
    <div>Book second</div>
    <div *ngIf="(author$ | async) as author">
      <p>Author: {{author.name}}</p>
      <p>Email: {{author.email}}</p>
    </div>
  `,
})
export class BookSecondComponent {
  author$: Observable<Author> = inject(ActivatedRoute).data.pipe(map(({author}) => author));
}
