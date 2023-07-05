import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

interface TemplateContextInterface {
  name: string;
  age: number;
  admin: boolean;
}

@Component({
  selector: 'app-template-usages',
  templateUrl: './template-usages.component.html',
  styleUrls: ['./template-usages.component.scss']
})
export class TemplateUsagesComponent implements AfterViewInit {
  @ViewChild('ngContainer', {read: ViewContainerRef}) ngContainer!: ViewContainerRef;
  @Input() template!: TemplateRef<void>;
  @Input() templateWithContext!: TemplateRef<TemplateContextInterface>;

  contextForTemplate: TemplateContextInterface = {
    name: 'john',
    age: 100,
    admin: true
  };

  users: Array<{name: string; age: number}> = [
    { name: 'John', age: 100 },
    { name: 'Doe', age: 100 },
  ];

  ngAfterViewInit(): void {
    this.ngContainer.createEmbeddedView(this.template);
  }
}
