
```
@Directive({
    selector: '[nuiLet]',
    standalone: true,
})
export class LetDirective<T> implements OnInit {
    @Input('nuiLet') data!: T;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<LetContext<T>>
    ) {}

    static ngTemplateContextGuard<T>(directive: LetDirective<T>, context: unknown): context is LetContext<T> {
        return true;
    }

    ngOnInit(): void {
        const context = new LetContext(this);
        this.viewContainerRef.createEmbeddedView(this.templateRef, context);
    }
}

export class LetContext<T> {
    constructor(private readonly directive: LetDirective<T>) {}

    get $implicit(): T {
        return this.directive.data;
    }

    get nuiLet(): T {
        return this.directive.data;
    }
}
```
