import { ObservableInput, Observable, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

type ViewModelInput = Record<string, ObservableInput<unknown>>;
type RewriteKey<T extends string | number | symbol> = T extends `${infer K}$` ? K : T;
type Unwrap<T> = T extends ObservableInput<infer E> ? E : never;
type ViewModelOutput<T extends ViewModelInput> = { [K in keyof T as RewriteKey<K>]: Unwrap<T[K]> }

/**
 * const viewModel = viewModelFrom({obs1$, obs2$, ..., obsN$})
 * @param source
 */
export function viewModelFrom<T extends ViewModelInput>(source: T): Observable<ViewModelOutput<T>> {
  const keys = Object.keys(source).map(x => x.replace(/\$$/, ''));
  return combineLatest(Object.values(source)).pipe(
    debounceTime(0),
    map((values) => {
      return keys.reduce((result, key, index) => {
        // @ts-ignore
        result[key] = values[index];
        return result;
      }, {
      }) as ViewModelOutput<T>;
    })
  );
}
