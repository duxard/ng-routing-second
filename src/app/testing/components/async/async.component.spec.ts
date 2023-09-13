import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { AsyncComponent } from './async.component';
import { EMPTY, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/*
flush() API only flushes non-periodic macroTasks such as setTimeout()
tick()  API flushes both - non-periodic (e.g. setInterval) as well as periodic macroTasks such as setInterval()
 */

describe('AsyncComponent', () => {
  let component: AsyncComponent;
  let fixture: ComponentFixture<AsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('will fail without flush in the end', fakeAsync(() => {
    let ran = false;
    setTimeout(() => { ran = true; }, 1000);
    tick();
    expect(ran).toEqual(false);
    flush();
  }));

  it('tick & flush example', fakeAsync(() => {
    let ran = false;
    setTimeout(() => { ran = true; }, 1000);

    // === tick(0)
    // should be tick(1000) for setTimeout to be resolved
    tick();
    expect(ran).toEqual(false);

    flush();
    expect(ran).toEqual(true);
  }));

  it('working with tick(number) as it should', fakeAsync(() => {
    component.startTimer();
    tick(1000);
    expect(component.timerComplete).toBeTrue();
  }));

  it('Promise', fakeAsync(() => {
    let counter = 0;

    setTimeout(() => {
      counter += 2;
    }, 2000);

    setTimeout(() => {
      counter += 3;
    }, 3000);

    Promise.resolve().then(() => ++counter); // microtask - is executed before macrotasks (setTimeout)
    flushMicrotasks();
    expect(counter).toBe(1);

    tick(2000);
    expect(counter).toBe(3);

    tick(3000);
    expect(counter).toBe(6);
  }));

  it('Synchronous observable', () => {
    let isSubscribed = false;
    of(EMPTY).subscribe(() => isSubscribed = true);
    expect(isSubscribed).toBeTrue();
  });

  it('Asynchronous observable', fakeAsync(() => {
    const DELAY = 1000;

    let isSubscribed = false;
    of(EMPTY).pipe(delay(DELAY)).subscribe(() => isSubscribed = true);
    tick(DELAY);
    expect(isSubscribed).toBeTrue();
  }));
});
