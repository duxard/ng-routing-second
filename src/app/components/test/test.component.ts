import {AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, QueryList} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterContentInit {

  @ContentChildren('child') spanElementRef!: QueryList<ElementRef>;

  options: string[] = [];

  ngAfterContentInit(): void {


    // ----------------------------------------

    const fe = this.spanElementRef.toArray()[0].nativeElement;

    console.log( (fe as HTMLSpanElement).getAttribute('data-target') );

    this.options = this.spanElementRef.toArray().map(elementRef => {
      return elementRef.nativeElement.innerText;
    });
  }

  foo(arr: unknown) {
    (arr as unknown as Array<unknown>).forEach(console.log);
  }
}
