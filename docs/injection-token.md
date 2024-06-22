## Simple usage:

````
import {InjectionToken, Provider} from "@angular/core";

export const COPYRIGHT_TOKEN = new InjectionToken<string>('COPYRIGHT_TOKEN');

export function provideDefaultCopyrightToken(): Provider {
  return { provide: COPYRIGHT_TOKEN, useValue: '©' };
}
````    
