## Browser API should be tokenized and injected

```
export const HISTORY = new InjectionToken<History>('[HISTORY]', {
    factory: () => history,
});

...

@Inject(HISTORY) private history: History

```
## Angular service providedIn VS forRoot

https://stackoverflow.com/questions/53251849/angular-service-providedin-vs-forroot

```
@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor() { }
}

===

@Injectable()
export class MyService {
  constructor() { }
}

@NgModule({
  imports: []
})
export class MyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyModule,
      providers: [
        MyService
      ]
    };
  }
}

@NgModule({
  imports: [
    MyModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
