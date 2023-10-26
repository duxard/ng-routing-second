import {Directive, InjectionToken} from '@angular/core';

export const PAINTER_DIRECTIVE = new InjectionToken<PainterDirective>(
  'PainterDirective',
);

@Directive({
  selector: '[appPainter]',
  // it's going to be used on the upper level, all child directives will be reusing this class,
  // so a new instance will be created each time the next child component refers to this directive
  // Therefore we need to use useExisting to avoid creating multiple instances of the class
  providers: [{ provide: PAINTER_DIRECTIVE, useExisting: PainterDirective }]
})
export class PainterDirective {
  // some API that is going to be used in child entities
  green() {
    console.log('painting green');
  }
  blue() {
    console.log('painting blue');
  }
}

/*

  <app-test appPainter>
    <p appGreenPainter>Uses appPainter API</p>
    <p appBluePainter>Uses appPainter API</p>
  </app-test>

 */
