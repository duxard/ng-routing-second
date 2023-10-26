import { Directive, Inject } from '@angular/core';
import { PAINTER_DIRECTIVE, PainterDirective } from './painter.directive';

@Directive({
  selector: '[appBluePainter]'
})
export class BluePainterDirective {
  constructor(@Inject(PAINTER_DIRECTIVE) private painterDirective: PainterDirective) {
    this.painterDirective.blue();
  }
}
