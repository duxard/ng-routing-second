import {inject, InjectionToken, Provider} from '@angular/core';
import {identity} from 'lodash';
import {ActivatedRoute} from '@angular/router';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';
import {isNull} from './is-null';
import {Observable, EMPTY, of} from 'rxjs';

export interface IProvideQueryParamOptions<T> {
  readonly name: string;
  readonly transform?: (value: string) => T;
  readonly defaultValue?: T;
}

export function provideQueryParam<T>(
  token: InjectionToken<Observable<T>>,
  { name, transform = identity, defaultValue }: IProvideQueryParamOptions<T>
): Provider {
  return {
    provide: token,
    useFactory: (route = inject(ActivatedRoute)): Observable<T> =>
      route.queryParamMap.pipe(
        switchMap((params) => {
          const param = params.get(name);
          if (isNull(param)) {
            return defaultValue === undefined ? EMPTY : of(defaultValue);
          }
          return of(transform(param));
        }),
        distinctUntilChanged()
      ),
  };
}
