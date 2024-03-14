## Example of container with slots 

```

@Component({
  selector: 'app-test-container',
  standalone: true,
  template: `
    <ng-container #headerSlot>
      <ng-content></ng-content>
    </ng-container>
    <ng-container #contentSlot>
      <ng-content></ng-content>
    </ng-container>
  `
})
export class TestContainer {
  @ViewChild('headerSlot', {static: true, read: ViewContainerRef}) headerSlot: ViewContainerRef | null = null;
  @ViewChild('contentSlot', {static: true, read: ViewContainerRef}) contentSlot: ViewContainerRef | null = null;
}

@Directive({
  selector: '[appTestContainerSlot]',
  standalone: true
})
export class TestContainerSlotDirective implements OnChanges, OnDestroy {
  @Input('appTestContainerSlot') slot!: string;

  private viewRef: EmbeddedViewRef<void> | null = null;
  constructor(
    @Inject(TestContainer)
    @Optional()
    private readonly testContainer: TestContainer | null,
    private readonly templateRef: TemplateRef<void>
  ) {}

  ngOnChanges(): void {
    this.viewRef?.destroy();
    this.viewRef = this.createViewRef();
  }

  ngOnDestroy(): void {
    this.viewRef?.destroy();
  }

  private createViewRef(): EmbeddedViewRef<void> | null {
    switch (this.slot) {
      case 'header-slot':
        return this.testContainer?.headerSlot?.createEmbeddedView(this.templateRef) ?? null;
      case 'content-slot':
        return this.testContainer?.contentSlot?.createEmbeddedView(this.templateRef) ?? null;
      default:
        return null;
    }
  }
}

// Usage:

<app-test-container>
  <span *appTestContainerSlot="'header-slot'">Lorem ipsum</span>
  <span *appTestContainerSlot="'content-slot'">Lorem ipsum</span>
</app-test-container>
```

## Directive that adds some html markup to the host element

```
import {
  Directive,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';
/*
 Adds html to host element 
 <p appHtmlWrapper>lorem ipsum</p>
 
 <p>lorem ipsum 
  <span class="test-class">All rights reserved (c)</span>
 </p>

 */
@Directive({
  selector: '[appHtmlWrapper]',
  standalone: true
})
export class HtmlWrapperDirective implements OnInit {
  element: HTMLElement | null = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    const renderer2 = this.renderer;
    const span = renderer2.createElement('span');
    const text = renderer2.createText('All rights reserved (c)')
    span.appendChild(text);
    renderer2.addClass(span, 'test-class');
    renderer2.appendChild(this.element, span);
  }
}
```
