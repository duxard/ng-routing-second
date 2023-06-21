import { Component, Directive, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[insertToCertainSlotInParent]'
})
export class ParentalDirective implements OnInit {
  constructor(
    private taskBuilder: TaskBuilderComponent,
    private template: TemplateRef<void>
  ) { }

  ngOnInit(): void {
    this.taskBuilder.addToView(this.template);
  }
}

@Component({
  selector: 'app-task-builder',
  template: `
    <main>
      <div class="header">
        <p>Footer:</p>
        <ng-container #viewSlot></ng-container>
      </div>
      <div class="content">
        <p>Content:</p>
        <ng-content></ng-content>
      </div>
    </main>
  `,
})
export class TaskBuilderComponent {
  @ViewChild('viewSlot', {read: ViewContainerRef, static: true}) private viewSlot!: ViewContainerRef;

  addToView(template: TemplateRef<void>): void {
    this.viewSlot.createEmbeddedView(template);
  }
}
