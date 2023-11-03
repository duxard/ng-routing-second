import { Component, OnInit } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

function delayed(timeout = 1000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const result: Observable<unknown> = original.apply(this, args);
      return result.pipe(delay(timeout));
    }
  };
}

function DelayedClassDecorator(timeout = 1000) {
  return (target: Function) => {
    const propsDescriptors = Object.getOwnPropertyDescriptors(target.prototype);
    for(const prop in propsDescriptors) {
      const descriptor = propsDescriptors[prop];
      const original = descriptor.value;

      if(original instanceof Function) {
        descriptor.value = function (...args: any[]) {
          const result = original.apply(this, args);
          return (result instanceof Observable) ? result.pipe(delay(timeout)) : result;
        }

        Object.defineProperty(target.prototype, prop, descriptor);
      }
    }
  };
}

@DelayedClassDecorator(2000)
@Component({
  selector: 'app-decorators',
  template: ``
})
export class DecoratorsComponent implements OnInit {

  foo1(): Observable<number[]> {
    return of([1, 2, 3]);
  }

  foo2(): Observable<boolean> {
    return of(true);
  }

  foo3(): Observable<boolean> {
    return of(false);
  }

  ngOnInit(): void {
    this.foo1().subscribe(console.log);
    this.foo2().subscribe(console.log);
    this.foo3().subscribe(console.log);
  }
}
