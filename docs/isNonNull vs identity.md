````
of(null).pipe(filter(isNonNull)).subscribe(console.log);
of('').pipe(filter(isNonNull)).subscribe(console.log);
of(undefined).pipe(filter(isNonNull)).subscribe(console.log);
of({}).pipe(filter(isNonNull)).subscribe(console.log);
of([]).pipe(filter(isNonNull)).subscribe(console.log);
of(false).pipe(filter(isNonNull)).subscribe(console.log);

of(null).pipe(filter(identity)).subscribe(console.log);
of('').pipe(filter(identity)).subscribe(console.log);
of(undefined).pipe(filter(identity)).subscribe(console.log);
of({}).pipe(filter(identity)).subscribe(console.log);
of([]).pipe(filter(identity)).subscribe(console.log);
of(false).pipe(filter(identity)).subscribe(console.log);
````

identity passes a result only when it's true. Different outcome:
````
of(false).pipe(filter(isNonNull)).subscribe(console.log);
of(false).pipe(filter(identity)).subscribe(console.log);

of('').pipe(filter(isNonNull)).subscribe(console.log);
of('').pipe(filter(identity)).subscribe(console.log);
````
