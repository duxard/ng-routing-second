import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxZipComponent } from './rx-zip.component';

describe('RxZipComponent', () => {
  let component: RxZipComponent;
  let fixture: ComponentFixture<RxZipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxZipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxZipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
