import { TestScheduler } from 'rxjs/testing'
import { delay, from, map, Observable, of, take, timer, concatMap,combineLatest } from "rxjs";
import {} from 'rxjs/operators';

function myFunction1(x: string): Observable<string> {
  return of(x).pipe(
    map((x) => x.split(' ')),
    map((x) => x.reverse()),
    map((x) => x.join(' ')),
    delay(10)
  );
}

describe('Test suite', () => {
  let scheduler: TestScheduler;
  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('returns simple value', () => {
    const y = myFunction1('humans eat tomatoes');
    const expectedMarbles = '10ms (a|)';
    const expectedValues = {
      a: 'tomatoes eat humans'
    };
    scheduler.run(({ expectObservable }) => {
      expectObservable(y).toBe(expectedMarbles, expectedValues);
    });
  });

  it('returns simple string value without delay', () => {
    const res$ = of('result');
    const expectedMarbles = '(a|)';
    const expectedValues = {
      a: 'result'
    };
    scheduler.run(({ expectObservable }) => {
      expectObservable(res$).toBe(expectedMarbles, expectedValues);
    });
  });

  xit('returns simple value with delay', () => {
    const res$ = of('result').pipe(delay(10));
    const expectedMarbles = '----------(a|)'; // or '10ms (a|)'
    const expectedValues = {
      a: 'result'
    };
    scheduler.run(({ expectObservable }) => {
      expectObservable(res$).toBe(expectedMarbles, expectedValues);
    });
  });

  it('example 1', () => {
    const res$ = timer(1, 1).pipe(take(2));
    const expectedMarbles = '-a(b|)';
    const expectedValues = {
      a: 0,
      b: 1
    };
    scheduler.run(({ expectObservable }) => {
      expectObservable(res$).toBe(expectedMarbles, expectedValues);
    });
  });

  it('example 2', () => {
    const res$ = timer(1);
    const expectedMarbles = '-(a|)';
    const expectedValues = { a: 0 };
    scheduler.run(({ expectObservable }) => {
      expectObservable(res$).toBe(expectedMarbles, expectedValues);
    });
  });

  it('example 3', () => {
    const res$ = from([1,2,3]).pipe(delay(1000)); // === of(1,2,3)
    const expectedMarbles = '1000ms (a-b-c|)';
    const expectedValues = {
      a: 1,
      b: 2,
      c: 3
    };
    scheduler.run(({ expectObservable }) => {
      expectObservable(res$).toBe(expectedMarbles, expectedValues);
    });
  });

  it('example 4', () => {
    const res$ =  from([1, 2, 3]).pipe(
      concatMap(x => of(x).pipe(
        delay(1))
      ),
      // filter(x => x!==2) //  const expectedMarbles = '-a-(c|)'
    );
    const expectedMarbles = '-ab(c|)';
    const expectedValues = {
      a: 1,
      b: 2,
      c: 3
    };
    scheduler.run(({ expectObservable }) => {
      expectObservable(res$).toBe(expectedMarbles, expectedValues);
    });
  });

  it('example 5', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const first = cold('x|');
      const second = cold('y|');
      const res = combineLatest([first, second]);
      expectObservable(res).toBe('a|', { a: ['x', 'y'] });
    });
  });

  it('example 6', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const first = cold('x|').pipe(map(() => true));
      const second = cold('y|');
      const res = combineLatest([first, second]);
      expectObservable(res).toBe('a|', { a: [true, 'y'] });
    });
  });

  it('example 7', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const first = cold('x|').pipe(
        map(() => true),
        delay(5)
      );
      const second = cold('y|');
      const res = combineLatest([first, second]);
      expectObservable(res).toBe('-----(a|)', { a: [true, 'y'] });
    });
  });
});
