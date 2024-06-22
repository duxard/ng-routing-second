##The multi parameter in Angular providers is used when you want to have multiple providers contribute to a single token.  When multi is set to true, Angular collects all providers for the same token into a single array. This is useful when you want to allow multiple services to register themselves under the same token, and then inject all of them in a single operation.

In the following example when you inject MY_TOKEN, you'll get an array ['Service 1', 'Service 2'].
````
import { InjectionToken } from '@angular/core';

export const MY_TOKEN = new InjectionToken<string[]>('MyToken', {
  providedIn: 'root',
  factory: () => [],
  multi: true
});

@NgModule({
  providers: [
    { provide: MY_TOKEN, useValue: 'Service 1', multi: true },
    { provide: MY_TOKEN, useValue: 'Service 2', multi: true }
  ]
})
export class AppModule { }
````
