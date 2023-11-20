import { InjectionToken, Provider, Type } from '@angular/core';

export interface IParent {
  disabled: boolean;
  foo(): void;
}

export const PARENT_COMPONENT = new InjectionToken<IParent>('[PARENT_COMPONENT]');

export function provideAsParent(type: Type<IParent>): Provider {
  return { provide: PARENT_COMPONENT, useExisting: type };
}
