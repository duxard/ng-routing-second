import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUsagesComponent } from './template-usages.component';

describe('TestComponent', () => {
  let component: TemplateUsagesComponent;
  let fixture: ComponentFixture<TemplateUsagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateUsagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateUsagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
