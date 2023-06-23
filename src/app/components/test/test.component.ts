import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef, Input,
  QueryList, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';

interface TemplateContextInterface {
  name: string;
  age: number;
  admin: boolean;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterViewInit {
  @ViewChild('ngContainer', {read: ViewContainerRef}) ngContainer!: ViewContainerRef;
  @Input() template!: TemplateRef<void>;
  @Input() templateWithContext!: TemplateRef<TemplateContextInterface>;

  contextForTemplate: TemplateContextInterface = {
    name: 'john',
    age: 100,
    admin: true
  };

  ngAfterViewInit(): void {
    this.ngContainer.createEmbeddedView(this.template);
  }
}
