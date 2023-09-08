import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <input type="text" id="textInput" [(ngModel)]="name">
    <button (click)="setName()">Set name</button>
  `
})
export class FormComponent {
  name = 'John';

  setName(): void {
    this.name = 'btn-click';
  }
}
