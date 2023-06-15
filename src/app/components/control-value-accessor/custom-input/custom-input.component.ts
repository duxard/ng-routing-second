import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * @description
 * onChange → the callback function to register on UI change
 * object to a DOM element.
 *
 * onTouch → the callback function to register on element touch
 *
 * set value(val: any) → sets the value used by the ngModel of the element
 *
 * writeValue(value: any) → This will will write the value to the view if the the value changes occur on the model programmatically (writes a value passed from the external ngModel)
 *
 * registerOnChange(fn: any) → When the value in the UI is changed, this method will invoke a callback function
 *
 * registerOnTouch(fn: any) → When the element is touched, this method will get called
 */
@Component({
  template: `
    <input [(ngModel)]="value"/>
    <p>Inside CVA control: <strong>{{state}}</strong></p>
  `,
  selector: 'app-custom-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  private onChange = (value: any) => {};
  private onTouch = (value: any) => {};

  state: string = '';

  set value(inputValue: string) {
    if(inputValue !== undefined && this.state !== inputValue) {
      this.state = inputValue;
      this.onChange(inputValue);
      this.onTouch(inputValue);
    }
  }

  get value() {
    return this.state;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: any): void {
    this.value = value;
  }
}
