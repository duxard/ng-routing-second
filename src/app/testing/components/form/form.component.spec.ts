import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
  two-way binding is async operation. Therefore, on order for changes to be reflected
  one needs to run tests using async features - whenStable() or inside fakeAsync() wrapper
   */

  // Example 1 - with whenStable()
  it('Two way binding - change value in TS component - whenStable()', () => {
    const div = fixture.debugElement.nativeElement.querySelector('#name');
    const textInput = fixture.debugElement.nativeElement.querySelector('#textInput');
    expect(div.textContent).toEqual('John');
    expect(textInput.value).toEqual('John');

    component.name = 'Doe';
    fixture.detectChanges();
    expect(div.textContent).toEqual('Doe');
    fixture.whenStable().then(() => {
      expect(textInput.value).toEqual('Doe');
    });
  });

  // Example 2 - the same as the previous, but using fakeAsync() wrapper
  it('Two way binding - change value in TS component - fakeAsync() wrapper', fakeAsync(() => {
    const div = fixture.debugElement.nativeElement.querySelector('#name');
    const textInput = fixture.debugElement.nativeElement.querySelector('#textInput');
    expect(div.textContent).toEqual('John');
    expect(textInput.value).toEqual('John');

    component.name = 'Doe';

    fixture.detectChanges(); // or autoDetectChanges()
    expect(div.textContent).toEqual('Doe');

    flush(); // or tick()
    expect(textInput.value).toEqual('Doe');
  }));

  it('Two way binding - change value in component view', fakeAsync(() => {
    const textInput = fixture.debugElement.nativeElement.querySelector('#textInput');
    textInput.value = 'new input value';
    textInput.dispatchEvent(new Event('input'));
    expect(textInput.value).toEqual(component.name);
  }));

  it('Two way binding - change value in TS component by btn click and check all bound values', fakeAsync(() => {
    const btn = fixture.debugElement.nativeElement.querySelector('#btn');
    const div = fixture.debugElement.nativeElement.querySelector('#name');
    const textInput = fixture.debugElement.nativeElement.querySelector('#textInput');

    btn.click();
    // TS prop
    expect(component.name).toEqual('btn-click');

    // Div value
    fixture.detectChanges(); // or autoDetectChanges()
    expect(div.textContent).toEqual('btn-click');

    // Input value
    flush(); // or tick() in this case
    expect(textInput.value).toEqual(component.name);
  }));
});
