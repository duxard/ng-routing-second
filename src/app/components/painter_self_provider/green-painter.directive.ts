import { Directive, Inject } from '@angular/core';
import { PAINTER_DIRECTIVE, PainterDirective } from './painter.directive';

@Directive({
  selector: '[appGreenPainter]'
})
export class GreenPainterDirective {
  constructor(@Inject(PAINTER_DIRECTIVE) private painterDirective: PainterDirective) {
    this.painterDirective.green();
  }
}
