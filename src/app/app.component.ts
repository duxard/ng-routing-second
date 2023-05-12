import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {Observable} from 'rxjs';
import {from} from 'rxjs';
import {of} from 'rxjs';
import {concatMap, delay, exhaustMap, map, mergeMap, share, shareReplay, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  options$ = of([1,2,3]).pipe(delay(1000));

  items$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(['css', 'js']);

  state$: Observable<string> = of('active').pipe(delay(4000));

  ngOnInit(): void {
    this.items$.subscribe();
    setTimeout(() => this.items$.next(['html', 'java']), 2000);
  }

  ngOnDestroy(): void {
    this.items$.unsubscribe();
  }

}
