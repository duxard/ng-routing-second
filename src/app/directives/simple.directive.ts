import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appSimple]'
})
export class SimpleDirective implements OnInit, OnDestroy {
  private evr!: EmbeddedViewRef<ElementRef<HTMLElement>>;

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<ElementRef<HTMLElement>>
  ) { }

  ngOnInit(): void {
    this.evr = this.view.createEmbeddedView(this.template);
  }

  ngOnDestroy(): void {
    this.evr.destroy();
  }
}
