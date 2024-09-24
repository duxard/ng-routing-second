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

## Cold and hot observables

A cold observable starts producing data when some code invokes a subscribe() function on it. For example, your app may declare an observable providing a URL on the server to get certain products. The request will be made only when you subscribe to it. If another script makes the same request to the server, it’ll get the same set of data.
A hot observable produces data even if no subscribers are interested in the data. For example, an accelerometer in your smartphone produces data about the position of your device, even if no app subscribes to this data. A server can produce the latest stock prices even if no user is interested in this stock.


## share & shareReplay

1) refCount: false - after both subscribers unsubscribe:  the source observable will keep emitting values (see console log)
2) refCount: true - after both subscribers unsubscribe:  the source observable will stop emitting values (see console log)

```
const obs$ = timer(0, 1000).pipe(
   tap(console.log),
   shareReplay({
     bufferSize: 1,
     refCount: false
   })
 );
 
 // First subscription
 const s1 = obs$.subscribe(data => console.log('First: ', data));
 let s2: Subscription | null = null;
 setTimeout(() => {
   // Second subscription after 2 seconds
   s2 = obs$.subscribe(data => console.log('Second: ', data));
 }, 2000);

onStop() {
  s1.unsubscribe();
  s2!.unsubscribe();
  // this.obs$.subscribe(data => console.log('Second: ', data));
}

onStart() {
  obs$.subscribe(data => console.log(data))
}
```

## refresh$$ example
```
@Input() readonly = false;

private readonly refresh$$ = new Subject<void>();

readonly isModifyEnabled$ = combineLatest([
    ...,
    this.refresh$$.pipe(startWith(null))
]).pipe(
   ...
);

ngOnChanges({ readonly }: SimpleChanges): void {
    if(readonly) {
        this.refresh$$.next();
    }
}

// Somewhere in template:
<ng-container *ngIf="isModifyEnabled$ | async"></ng-container>
```

