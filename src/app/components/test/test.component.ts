import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  QueryList
} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements AfterContentInit {

  @ContentChildren('child') spanElementRef!: QueryList<ElementRef>;
  @ContentChild('info') info!: HTMLParagraphElement;

  options: string[] = [];

  ngAfterContentInit(): void {


    // ----------------------------------------

    const spanEl = this.spanElementRef.toArray()[0].nativeElement;

    console.log( (spanEl as HTMLSpanElement).getAttribute('data-target') );

    console.log( (['1', 1] as Array<string | null>).map(el => (el ? +el : -1)) );

    this.options = this.spanElementRef.toArray().map(elementRef => {
      return elementRef.nativeElement.innerText;
    });

    console.log( this.info.innerText )
  }

  foo(arr: unknown) {
    (arr as any).forEach(console.log);
  }
}
