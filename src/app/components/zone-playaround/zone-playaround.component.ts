import {ChangeDetectionStrategy, Component, DoCheck, NgZone} from '@angular/core';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const dummyApi = () => of(['one', 'two', 'three']);

@UntilDestroy()
@Component({
  changeDetection:  ChangeDetectionStrategy.OnPush,
  selector: 'app-zone-playaround',
  styles: [],
  template: `
    <button (click)="onClick()">Play Zone</button>
  `
})
export class ZonePlayaroundComponent implements DoCheck {
  private doCheckCount = 0;

  constructor(private zone: NgZone) { }

  ngDoCheck(): void {
    console.log(`doCheckCount: ${++this.doCheckCount}`);
  }

  onClick(): void {
    console.clear();
    dummyApi().pipe(untilDestroyed(this)).subscribe(data => {
      console.log("Data received");
    });
  }
}
