import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

interface TemplateContext {
  info: string;
  id: number;
}

@Directive({
  selector: '[mip]'
})
export class MultipleInputParamsDirective implements OnInit {
  @Input() set mip(condition: boolean) {
    if (condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  @Input('mipParam') param?: string;
  @Input('mipTemplate') template?: TemplateRef<TemplateContext>;
  @Input('mipTemplateCtx') templateCtx?: TemplateContext;

  private hasView = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private templateRef: TemplateRef<void>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    console.log(this.param);

    if(this.template instanceof TemplateRef) {
      if(this.templateCtx) {
        console.log(this.templateCtx);
        this.viewContainer.createEmbeddedView(this.template, this.templateCtx);
      } else {
        this.viewContainer.createEmbeddedView(this.template);
      }
    }

    // just for testing purposes
    if(this.elementRef.nativeElement.parentElement){
      this.elementRef.nativeElement.parentElement.style.color = 'blue';
    }
  }
}
