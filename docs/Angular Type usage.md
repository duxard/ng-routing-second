## Angular Type<T> usage:

````
import {InjectionToken, Provider, Type} from "@angular/core";

export interface ISandboxOptions {
  readonly sandboxService: Type<BaseSandboxService>;
}

export abstract class BaseSandboxService { }

export class SandboxService extends BaseSandboxService {}

export const config: ISandboxOptions = {
  sandboxService: SandboxService
}

export const SANDBOX_SERVICE_TOKEN = new InjectionToken<Type<BaseSandboxService>>('SOME_SERVICE');

export function provideDefaultSandboxService(): Provider {
  return {
    provide:  SANDBOX_SERVICE_TOKEN,
    useExisting: config.sandboxService
  }
}
````
