import { Component, DoCheck, NgZone} from '@angular/core';
import { of } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const dummyApi = () => of(['one', 'two', 'three']);

@UntilDestroy()
@Component({
  selector: 'app-zone-playaround',
  styles: [],
  template: `
    <button (click)="onClick()">Play Zone</button>
    <p>{{text}}</p>
  `
})
export class ZonePlayaroundComponent implements DoCheck {
  private doCheckCount = 0;
  text = 'initial text';

  constructor(private zone: NgZone) { }

  ngDoCheck(): void {
    console.log(`doCheckCount: ${++this.doCheckCount}`);
  }

  onClick(): void {
    this.zone.runOutsideAngular(() => {
      dummyApi().pipe(untilDestroyed(this)).subscribe(_ => {
        console.log('onClick');
        this.text = 'onClick'
      });
    });
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        console.log('setTimeout');
        this.text = 'setTimeout'
      }, 1000);
    });
  }
}

