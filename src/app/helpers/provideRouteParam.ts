import { inject, InjectionToken, Provider} from '@angular/core';
import { Observable, EMPTY, map, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';
import {isNonNull} from './is-non-null';

export function provideRouteParam(token: InjectionToken<Observable<string>>, name: string): Provider {
  return {
    provide: token,
    useFactory: (currentRoute = inject(ActivatedRoute)): Observable<string> => {
      const route = currentRoute.pathFromRoot.reverse().find(param => param.snapshot.paramMap.has(name));
      if(!route) {
        return EMPTY;
      }
      return route.paramMap.pipe(
        map(params => params.get(name)),
        filter(isNonNull),
        distinctUntilChanged()
      );
    }
  }
}

/**
 *  Usage:
 *
 *  const USER_ID = new InjectionToken<Observable<string>>('USER_ID', { factory: () => EMPTY });
 *
 *  providers: [provideRouteParam(USER_ID, 'userId')]
 *
 *  constructor(@Inject(USER_ID) private readonly userId$: Observable<string>) {}
 *
 */

