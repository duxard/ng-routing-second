## Polling 

```
let resultEnabled = false;
setTimeout(() => resultEnabled = true, 3000)
const resultEnabled$ = of(null).pipe(switchMap(() => of(resultEnabled)));

timer(0, 1000).pipe(
  switchMap(() => resultEnabled$),
  takeWhile(isResultTrue => !isResultTrue)
).subscribe()

resultEnabled$.pipe(
  repeatWhen(($) => $.pipe(delay(POLLING_INTERVAL))),
  takeWhile(isResultTrue => !isResultTrue)
).subscribe();

resultEnabled$.pipe(
  repeat({ delay: POLLING_INTERVAL }),
  takeWhile(isResultTrue => !isResultTrue)
).subscribe();
```

