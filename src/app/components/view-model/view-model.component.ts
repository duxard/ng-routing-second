import { Component, OnInit } from '@angular/core';
import { Observable, of, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  name: string;
}

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss']
})
export class ViewModelComponent implements OnInit {

  readonly viewModel$!: Observable<{
    fruits: string[];
    vegetables: string[];
    user: User;
  }>;

  private readonly fruits$!: Observable<string[]>;
  private readonly vegetables$!: Observable<string[]>;
  readonly user$: BehaviorSubject<User> = new BehaviorSubject<User>({ name: 'Alex' });

  constructor() {
    this.fruits$ = this.getFruit();
    this.vegetables$ = this.getVegetables();

    this.viewModel$ = combineLatest([this.fruits$, this.vegetables$, this.user$]).pipe(
      map(([fruits, vegetables, user]) => ({fruits, vegetables, user})),
    );
  }

  ngOnInit(): void {
    // will update username in template dou to subject observable emission
    setTimeout(() => {
      this.user$.next({name: 'John'})
    }, 2000)
  }

  getFruit(): Observable<string[]> {
    return of(['apple', 'orange', 'plum']);
  }

  getVegetables(): Observable<string[]> {
    return of(['tomato', 'onion']);
  }


}
