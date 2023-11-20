import { Component, ContentChildren, QueryList } from '@angular/core';
import { IParent, provideAsParent } from './tokens/parent.token';
import { CHILD_COMPONENT, IChild } from './tokens/child.token';

@Component({
  selector: 'app-parent',
  template: `
    <p>parent works</p>
    <ng-content></ng-content>
  `,
  providers: [provideAsParent(ParentComponent)]
})
export class ParentComponent implements IParent {
  disabled = false;

  @ContentChildren(CHILD_COMPONENT, { descendants: true }) children!: QueryList<IChild>;

  foo(): void {
    console.log(this.children.toArray())
  }
}
