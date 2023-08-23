import {Component, EventEmitter, Input, Output} from '@angular/core';

type IconType = 'alert' | 'pointer' | 'arrow' | 'default';
type VariantType = 'small' | 'middle' | 'large' | 'extra-large';

@Component({
  selector: 'tui-button',
  template: `
    <button (click)="onClick()">My button</button>
    <div>Inputs (props):</div>
    <div>Icon: {{icon}}</div>
    <div>Variant: {{variant}}</div>
    <div>Text: {{text}}</div>
  `
})
export class TuiButtonComponent {
  @Input() icon: IconType = 'default';
  @Input() variant: VariantType = 'small';
  @Input() text: string = '';
  @Output() onButtonClick = new EventEmitter<string>();

  onClick(): void {
    this.onButtonClick.emit('clicked');
  }
}
