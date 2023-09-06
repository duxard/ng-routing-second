import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

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

  constructor(public hs: HomeService) { }

  ngOnInit(): void {
    this.message = this.hs.getName();
  }
}
