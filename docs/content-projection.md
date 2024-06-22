## 1

````
<p ngProjectAs="bodySlot">Projected</p>

<ng-content select="bodySlot"></ng-content>
````

## 2

````
<p bodySlot>Projected</p>

<ng-content select="[bodySlot]"></ng-content>
````

## 3

````
<ng-template #tplName>
    <span>Template</span>
</ng-template>

<ng-container [ngTemplateOutlet]="tplName"></ng-container>
````

## 4

````
@Directive({
  selector: '[appElementSelector]'
})
export class ElementSelectorDirective<T> {
  tpl = this.templateRef;

  constructor(private templateRef: TemplateRef<T>) { }
}

<app-child-one>
  <p *appElementSelector>Projected</p>
</app-child-one>

-----------------------------------------------------------------
Contents of <app-child-one>:

@ContentChild(ElementSelectorDirective) elementSelectorDirective: ElementSelectorDirective<unknown> | null = null;

<ng-container [ngTemplateOutlet]="elementSelectorDirective?.tpl || defaultTpl"></ng-container>
<ng-template #defaultTpl>
    <span>Template</span>
</ng-template>
````
