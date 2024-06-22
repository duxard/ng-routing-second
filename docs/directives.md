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

## Example of attribute directive and it's application which shows how the directive can be applied. It just paints the host element and provides some public API to apply, wraps each inner component inside <span>

````

@Directive({
  selector: '[appNuiButton]',
  exportAs: 'appNuiButton',
  standalone: true
})
export class NuiButtonDirective implements OnInit, AfterViewInit {
  @HostBinding('class')
  get className(): Record<string, boolean> {
    return {
      'nui-button': true,
      [`nui-button--blue`]: true
    };
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    console.log('Mouse entered');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    console.log('Mouse left');
  }

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2

  ) { }

  ngOnInit(): void {
    // do the same stuff - apply the styles to "style" attr of the component this directive is applied to
    this.viewContainerRef.element.nativeElement.style.borderColor = 'red';
    this.elementRef.nativeElement.style.color = 'green';
  }

  logMessage(): void {
    console.log('Button directive clicked');
  }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.childNodes.forEach((node) => {
      if (node.nodeName !== '#text') {
        return;
      }
      const span = this.renderer.createElement('span');
      const parent = this.renderer.parentNode(node);
      this.renderer.insertBefore(parent, span, node);
      this.renderer.appendChild(span, node);
    });
  }
}
-------------------------------------------------------------------------
usage:

<button
  appNuiButton
  #anchor="appNuiButton"
  (click)="anchor.logMessage()"
>Test</button>
````

## Example of attribute directive with inputs & outputs applied to some component:

````
@Directive({
  selector: '[appExtraColumn]',
  exportAs: 'appExtraColumn',
})
export class ExtraColumnDirective implements OnInit {
  @Input() columnName?: string;

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    this.extraColumnClick.emit('Extra column clicked');
  }

  @Output() extraColumnClick = new EventEmitter<string>();

  constructor(private readonly testGridComponent: TestGridComponent) { }

  ngOnInit(): void {

    let name = 'extra';
    if(this.columnName) {
      name = this.columnName;
    }
    this.testGridComponent.columns.push(name);
  }

  messageFromDirective(): void {
    console.log('Message from directive');
  }
}
````
