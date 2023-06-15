import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-input-testing',
  template: `
    <app-custom-input [(ngModel)]="inputValue"></app-custom-input>
    <p>Outside CVA control: <strong>{{inputValue}}</strong></p>
  `
})
export class CustomInputTestingComponent  {
  inputValue = 'hello';
}
