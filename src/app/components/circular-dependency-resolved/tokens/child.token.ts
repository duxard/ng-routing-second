import { InjectionToken, Provider, Type } from '@angular/core';

export interface IChild {
  disabled: boolean;
  goo(): void;
}

export const CHILD_COMPONENT = new InjectionToken<IChild>('[CHILD_COMPONENT]');

export function provideAsChild(type: Type<IChild>): Provider {
  return { provide: CHILD_COMPONENT, useExisting: type };
}
