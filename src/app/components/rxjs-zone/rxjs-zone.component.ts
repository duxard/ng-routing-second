import { Component, NgZone } from '@angular/core';
import { filter, tap} from 'rxjs/operators';
import { timer, pipe, MonoTypeOperatorFunction, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-rxjs-zone',
  template: `
    <p>
      See console for logs.
    </p>
    <p>
      Seconds elapsed: {{seconds$ | async}}
    </p>
  `
})
export class RxjsZoneComponent  {
  readonly seconds$ = timer(0, 1000).pipe(
    tap(i => console.log(i, ' is in Angular zone: ', NgZone.isInAngularZone())),
    filter(i => !(i % 2)),
    zoneOptimized(this.zone),
    tap(i =>
      console.log(i, ' has returned to the zone: ', NgZone.isInAngularZone())
    )
  );

  constructor(private readonly zone: NgZone) {}
}

export function zonefree<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return source =>
    new Observable(subscriber =>
      zone.runOutsideAngular(() => source.subscribe(subscriber))
    );
}

export function zonefull<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return source =>
    new Observable(subscriber =>
      source.subscribe({
        next: value => zone.run(() => subscriber.next(value)),
        error: error => zone.run(() => subscriber.error(error)),
        complete: () => zone.run(() => subscriber.complete())
      })
    );
}

export function zoneOptimized<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return pipe(
    zonefree(ngZone),
    zonefull(ngZone)
  );
}

function runInZone<T>(zone: NgZone): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => {
    return new Observable((observer: Subscriber<T>) => {
      const onNext = (value: T) => zone.run(() => observer.next(value));
      const onError = (e: unknown) => zone.run(() => observer.error(e));
      const onComplete = () => zone.run(() => observer.complete());
      return source.subscribe(onNext, onError, onComplete);
    });
  };
}
