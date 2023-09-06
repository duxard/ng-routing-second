import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: HomeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ HomeService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = fixture.debugElement.injector.get(HomeService);

    // Other way to initialize:

    // TestBed.configureTestingModule({
    //   providers: [
    //     HomeComponent,
    //     HomeService
    //   ]
    // });
    // component = TestBed.inject(HomeComponent);
    // service = TestBed.inject(HomeService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component.title).toEqual('home component');
  });

  it('service check 1', () => {
    component.ngOnInit();
    expect(component.message).toEqual('HomeService');
  });

  it('service check 2', () => {
    const componentSpy = spyOn(service, 'getName');
    component.ngOnInit();
    expect(componentSpy).toHaveBeenCalled();
  });

  it('service check 3', () => {
    spyOn(component.hs, 'getName').and.returnValue('HomeService');
    component.ngOnInit();
    expect(component.message).toEqual('HomeService');
  });

  it('service check 4', () => {
    spyOn(component.hs, 'getName').and.callThrough();
    component.ngOnInit();
    expect(component.message).toEqual('HomeService');
  });

  it('service check 5', () => {
    // without callThrough() spy executes the original method but returns undefined instead of the actual result
    spyOn(component.hs, 'getName');
    component.ngOnInit();
    expect(component.message).not.toBeDefined()
  });

  it('DOM test 1', () => {
    const componentDE: DebugElement = fixture.debugElement;
    const paragraphDE: DebugElement = componentDE.query(By.css('.section-one'));
    const p: HTMLParagraphElement = paragraphDE.nativeElement;
    expect(p.textContent).toEqual('Section one');
  });

  it('DOM test 2', () => {
    const componentDE: DebugElement = fixture.debugElement;
    const paragraphNE: HTMLElement = componentDE.nativeElement;
    const p: HTMLParagraphElement | null = paragraphNE.querySelector('.section-one');
    expect(p!.textContent).toEqual('Section one');
  });
});
