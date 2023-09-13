import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

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

  it('DI check 1', () => {
    expect(service instanceof HomeService).toBeTruthy();
  });

  it('DI check 2', inject([HomeService], (hs: HomeService) => {
    expect(hs).toBeTruthy();
    expect(hs instanceof HomeService).toBeTrue();
  }));

  it('check component title', () => {
    expect(component.title).toEqual('home component');
  });

  it('spyOn - 1', () => {
    spyOn(component, 'getNumber');
    component.ngOnInit();
    expect(component.getNumber).toHaveBeenCalled();
  });

  it('spyOn - 2', () => {
    spyOn(component, 'getNumber').and.returnValue(2000);
    const result = component.getNumber();
    expect(result).toEqual(2000);
  });

  it('spyOn - 3', () => {
    spyOn(component, 'fetchResult').and.callFake(() => of(100));
    // incResult() will not have any effect because it's stubbed
    spyOn(component, 'incResult').and.stub();
    component.saveResult();
    expect(component.result).toEqual(100);
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

  it('input one event', () => {
    const inputOne = fixture.debugElement.nativeElement.querySelector('#inputOne');
    const label = fixture.debugElement.nativeElement.querySelector('#label');
    inputOne.dispatchEvent(new Event('input'));
    expect(component.label).toEqual('label - inputOne')

    fixture.detectChanges();
    expect(label.textContent).toEqual('label - inputOne')
  });

  it('input two event', () => {
    const inputTwo = fixture.debugElement.nativeElement.querySelector('#inputTwo');
    inputTwo.value = 'inputTwo text';
    inputTwo.dispatchEvent(new Event('input'));
    expect(component.label).toEqual('inputTwo text')
  });


  it('emit event by btn click 1', () => {
    const inputTwo = fixture.debugElement.nativeElement.querySelector('#btn');
    const emitterSpy = spyOn(component.textEmitter, 'emit');
    inputTwo.click();
    expect(emitterSpy).toHaveBeenCalledWith('emitted text')
  });

  it('emit event by btn click 2', () => {
    const inputTwo = fixture.debugElement.query(By.css('#btn'));
    const emitterSpy = spyOn(component.textEmitter, 'emit');
    inputTwo.triggerEventHandler('click', null);
    // OR #1: inputTwo.nativeElement.dispatchEvent(new Event('click'));
    // OR #2: inputTwo.nativeElement.click();
    expect(emitterSpy).toHaveBeenCalledWith('emitted text')
  });

  it('spyOn and withArgs()', () => {
    // withArgs always goes in pair with returnValue()
    spyOn(component, 'sum').withArgs(1, 2).and.returnValue(10);
    const res = component.sum(1,2); // should be the same as in withArgs()
    expect(res).toBe(10);
  });
});
