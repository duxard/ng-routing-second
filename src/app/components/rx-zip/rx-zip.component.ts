import { Component, OnInit } from '@angular/core';
import { Observable, Subject, tap, combineLatest, zip, forkJoin } from 'rxjs';

@Component({
  selector: 'app-rx-zip',
  templateUrl: './rx-zip.component.html',
  styleUrls: ['./rx-zip.component.scss']
})
export class RxZipComponent implements OnInit {

  tomatoes$ = new Subject<string>();
  cheese$ = new Subject<string>();
  cucumber$ = new Subject<string>();
  olives$ = new Subject<string>();
  dressing$ = new Subject<string>();

  salad$!: Observable<any>;

  ngOnInit(): void {
    this.salad$ = zip([
    // this.salad$ = combineLatest([
    // this.salad$ = forkJoin([
      this.tomatoes$.pipe(tap(console.log)),
      this.cheese$.pipe(tap(console.log)),
      this.cucumber$.pipe(tap(console.log)),
      this.olives$.pipe(tap(console.log)),
      this.dressing$.pipe(tap(console.log))
    ]).pipe(tap(console.log))
  }

  complete() {
    this.tomatoes$.complete();
    this.cheese$.complete();
    this.cucumber$.complete();
    this.olives$.complete();
    this.dressing$.complete();
  }

}


