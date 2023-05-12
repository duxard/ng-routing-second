import { Component, OnInit } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss']
})
export class ViewModelComponent implements OnInit {

  readonly viewModel$!: Observable<{
    fruits: string[];
    vegetables: string[];
  }>;

  private readonly fruits$!: Observable<string[]>;
  private readonly vegetables$!: Observable<string[]>;

  constructor() {
    this.fruits$ = this.getFruit();
    this.vegetables$ = this.getVegetables();

    this.viewModel$ = combineLatest([this.fruits$, this.vegetables$]).pipe(
      map(([fruits, vegetables]) => ({fruits, vegetables})),
    );
  }

  ngOnInit(): void {
  }

  getFruit(): Observable<string[]> {
    return of(['apple', 'orange', 'plum']);
  }

  getVegetables(): Observable<string[]> {
    return of(['tomato', 'onion']);
  }


}
