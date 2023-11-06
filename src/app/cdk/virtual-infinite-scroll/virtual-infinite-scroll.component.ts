import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, pairwise, map, throttleTime, tap, switchMap } from 'rxjs/operators';
import { isNonNull } from '../../helpers/is-non-null';
import { timer } from 'rxjs';

const BOTTOM_OFFSET = 140;
const THROTTLE_TIME = 200;
const MOCK_DELAY_TIME = 1000;

@UntilDestroy()
@Component({
  selector: 'app-virtual-infinite-scroll',
  templateUrl: './virtual-infinite-scroll.component.html',
  styleUrls: ['./virtual-infinite-scroll.component.scss'],
  standalone: true,
  imports: [ScrollingModule]
})
export class VirtualInfiniteScrollComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, {static: true}) scroller: CdkVirtualScrollViewport | null = null;

  items = getData();
  isLoading = false;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.scroller?.elementScrolled()
      .pipe(
        map(() => this.scroller?.measureScrollOffset('bottom')),
        filter(isNonNull),
        pairwise(),
        filter(([y1 , y2]) => ((y2<y1) && (y2<BOTTOM_OFFSET))),
        throttleTime(THROTTLE_TIME),
        switchMap(() => {
          this.isLoading = true;
          return timer(MOCK_DELAY_TIME).pipe(
            tap(() => {
              this.fetchMore();
              this.isLoading = false;
            }),
          )
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private fetchMore(): void {
    this.ngZone.run(() => {
      this.items = [...this.items, ...getData()];
    });
  }
}

function getData(): string[] {
  return Array.from({length: 50}).map((_, i) => `Item #${i}`);
}


