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
## 4 via ng-template + ngTemplateOutlet

````
import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-card-view',
  template: `
    <div>
      <h2>Card projected content:</h2>

      <ng-template
        [ngTemplateOutletContext]="{ cardContentData: data }"
        [ngTemplateOutlet]="cardContentTemplate"
      >
      </ng-template>
    </div>
  `
})
export class CardViewComponent {
  @Input() data: string = '';

  @ContentChild('cardContentTemplate', { static: true })
  cardContentTemplate: TemplateRef<unknown> | null = null;
}

// Usage:

<app-card-view
  [data]="'Lorem ipsum'"
>
  <ng-template #cardContentTemplate let-data="cardContentData">
    <span>Projected template with {{ data }}</span>
  </ng-template>
</app-card-view>
````
