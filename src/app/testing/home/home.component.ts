import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  styles: [],
  template: `
    <p>home works!</p>
    <p class="sectione-one">Section one</p>
    <p class="sectione-two">Section two</p>
  `,
})
export class HomeComponent implements OnInit {
  title = 'home component';
  message = '';
  result = 0;

  constructor(public hs: HomeService) { }

  ngOnInit(): void {
    this.message = this.hs.getName();
    this.getNumber();
  }

  getNumber(): number {
    return 100;
  }

  saveResult(): void {
    this.fetchResult().subscribe((data: number) => this.result = data);
    this.incResult();
  }

  fetchResult(): Observable<number> {
    return of(1);
  }

  incResult(): void {
    this.result++;
  }
}
