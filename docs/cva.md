## CVA ultimate example:

```
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-box-control',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: BoxControlComponent, multi: true }],
  template: `
    <div>
      <p>{{value}}</p>
      <button (click)="onClick()">Change value</button>
    </div>
  `
})
export class BoxControlComponent implements ControlValueAccessor {
  @Input()
  set value(val: string) {
    this._value = val;
  }
  get value(): string {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<string>();

  private _value = '';

  private onTouchedFn: () => unknown = () => {}; // = noop (lodash)
  private onChangeFn: (selected: string) => void = () => {}; // = noop (lodash)

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  writeValue(val: string): void {
    this.value = val;
  }

  onClick(): void {
    // [ngModel]="mgModelValue"
    this.value = 'New value';
    // if we change control value, we need to pass a new value to this.onChangeFn
    this.emitChanges();
  }

  private emitChanges(): void {
    this.onChangeFn(this.value);         // (ngModelChange)="onValueChange($event)"
    this.valueChange.emit(this.value);   // (valueChange)="onValueChange($event)"
  }
}
```

## Usage:
````
<!-- As a common ng component -->
<app-box-control
  value="Hello World"
  (valueChange)="onValueChange($event)"
></app-box-control>

<!-- As a form control -->
<app-box-control
  [ngModel]="mgModelValue"
  (ngModelChange)="onValueChange($event)"
></app-box-control>

<!-- Inside a form -->
<form [formGroup]="form">
    <app-box-control fromControlName="controlName"></app-box-control>
</form>
````
