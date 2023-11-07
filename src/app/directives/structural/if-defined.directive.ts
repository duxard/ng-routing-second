import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

class IfDefinedDirectiveContext {
  $implicit = 'implicit prop';
  ifDefined = '';
  contextPropOne = 1000;
}

@Directive({
  selector: '[ifDefined]'
})
export class IfDefinedDirective implements OnInit {
  @Input('ifDefined') set showText(val: string) {
    this._showText = val;
    this.context.ifDefined = this._showText;
  }
  @Input('ifDefinedOtherwise') placeholder: TemplateRef<IfDefinedDirectiveContext> | null = null;

  _showText = '';

  private context = new IfDefinedDirectiveContext();

  constructor(
    private viewRef: ViewContainerRef,
    private template: TemplateRef<IfDefinedDirectiveContext>
  ) { }

  ngOnInit(): void {
    if(this._showText) {
      this.viewRef.createEmbeddedView(this.template, this.context);
    } else if(this.placeholder instanceof TemplateRef) {
      this.viewRef.createEmbeddedView(this.placeholder, this.context);
    } else {
      this.viewRef.clear();
    }
  }

  static ngTemplateContextGuard(dir: IfDefinedDirective, ctx: unknown): ctx is IfDefinedDirectiveContext {
    return true;
  }
}
