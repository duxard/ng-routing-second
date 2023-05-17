import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs';
import {delay, mapTo, share, shareReplay, tap} from 'rxjs/operators';
import {timer} from 'rxjs';
import {from} from 'rxjs';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  source = timer(1000);
  example = this.source.pipe(
    tap(() => console.log('***SIDE EFFECT***')),
    mapTo('***RESULT***'),
    share()
  );


  private readonly source$ = this.getResult().pipe(
    delay(1500),
    tap(() => console.log('Execute request')),
    share(),
    // shareReplay()
  );
  private readonly res1$ = this.source$;
  private readonly res2$ = this.source$;

  constructor() { }

  ngOnInit(): void {
    this.source$.subscribe(console.log);
    this.source$.subscribe(console.log);
    // this.example.subscribe(console.log);
    // this.example.subscribe(console.log);
  }

  private getResult(): Observable<number> {
    return of(Math.floor(Math.random()*100));
  }

}
