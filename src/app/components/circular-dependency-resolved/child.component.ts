import { Component, Inject } from '@angular/core';
import { IChild, provideAsChild } from './tokens/child.token';
import { IParent, PARENT_COMPONENT } from './tokens/parent.token';

@Component({
  selector: 'app-child',
  template: `
    <p>child works</p>
    <ng-content></ng-content>
  `,
  providers: [provideAsChild(ChildComponent)]
})
export class ChildComponent implements IChild {
  disabled = false;

  constructor(@Inject(PARENT_COMPONENT) private readonly parentComponent: IParent) { }

  goo(): void {
    console.log(this.parentComponent);
  }
}
