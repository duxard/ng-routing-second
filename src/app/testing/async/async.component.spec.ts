import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { AsyncComponent } from './async.component';

/*
flush() API only flush non-periodic macroTasks such as setTimeout()
tick()  API only flush non-periodic AND periodic macroTasks such as setInterval()
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
});
