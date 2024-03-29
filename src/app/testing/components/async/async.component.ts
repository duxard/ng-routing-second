import { Component } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-async',
  styles: [],
  templateUrl: `async.component`,
})
export class AsyncComponent {
  timerComplete = false;

  startTimer(): void {
    timer(1000).subscribe(() => this.timerComplete = true);
  }
}
