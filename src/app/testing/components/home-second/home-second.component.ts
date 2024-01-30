import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HomeService } from './home.service';


@Component({
  selector: 'app-second-home',
  styles: [],
  template: ``,
})
export class HomeSecondComponent implements OnInit {
  users: string[] = [];
  counter = 0;
  result = 0;
  result2 = 0;
  data = [];

  data$$ = new Subject<string[]>();

  constructor(private hs: HomeService) {}

  ngOnInit(): void {
    this.hs.getUsers().subscribe(data => {
      this.users = data;
      this.data$$.next(this.users);
    });

    this.counter = 1;
    this.result = this.multiplyByTen(10);
    this.result2 = this.setResult2(111);
  }

  multiplyByTen(value: number): number {
    return value*10;
  }

  setResult2(val: number): number {
    return val;
  }

  subscribeToUsers(): void {
    this.hs.users$.subscribe(data => {
      // @ts-ignore
      this.data = data;
    })
  }

  subscribeToUsers2(): void {
    this.hs.users2$.subscribe(data => {
      // @ts-ignore
      this.data = data;
    })
  }
}
