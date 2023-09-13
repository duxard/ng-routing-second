import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { HomeService } from './home.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  styles: [],
  template: `
    <p>home works!</p>
    <p class="sectione-one">Section one</p>
    <p class="sectione-two">Section two</p>
    
    <input type="text" id="inputOne" (input)="onChangeInputOne()">
    <input type="text" id="inputTwo" (input)="onChangeInputTwo($event)">
    
    <button (click)="onBtnClick()">Emit text</button>
  `,
})
export class HomeComponent implements OnInit {
  @Output() textEmitter = new EventEmitter<string>();

  title = 'home component';
  message = '';
  result = 0;
  label = 'default label';

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

  onChangeInputOne(): void {
    this.label = 'label - inputOne';
  }

  onChangeInputTwo(event: Event): void {
    this.label = (event.target as HTMLInputElement).value;
  }

  onBtnClick(): void {
    this.textEmitter.emit('emitted text');
  }

  sum(a: number, b: number): number {
    return a+b;
  }
}
