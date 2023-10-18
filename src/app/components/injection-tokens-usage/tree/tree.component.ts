import { Component, ElementRef, InjectionToken, Provider, Type } from '@angular/core';

// app-tree as ElementRef
export const TREE_ELEMENT_REF = new InjectionToken<ElementRef<HTMLElement>>('[TREE_ELEMENT_REF]');

export function provideAsTreeElementRef(): Provider {
  return { provide: TREE_ELEMENT_REF, useExisting: ElementRef };
}

// app-tree as angular component
export interface ITreeHost {
  grow(): void;
  bloom(): void;
}

export const TREE_HOST = new InjectionToken<ITreeHost>('[TREE_HOST]');

export function provideAsTreeHost(type: Type<ITreeHost>): Provider {
  return { provide: TREE_HOST, useExisting: type };
}

@Component({
  selector: 'app-tree',
  template: `<app-tree-branch></app-tree-branch>`,
  providers: [provideAsTreeElementRef(), provideAsTreeHost(TreeComponent)]
})
export class TreeComponent {
  grow(): void {
    console.log('growing');
  }

  bloom(): void {
    console.log('blooming');
  }
}
