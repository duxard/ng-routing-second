import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef, Input,
  QueryList, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterViewInit {
  @ViewChild('ngContainer', {read: ViewContainerRef}) ngContainer!: ViewContainerRef;
  @Input() template!: TemplateRef<any>;

  ngAfterViewInit(): void {
    this.ngContainer.createEmbeddedView(this.template);
  }
}
