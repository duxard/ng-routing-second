import {Component, OnInit} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({ template: '' })
class HomeComponent implements OnInit {
  obj = {
    id: '1',
    coordinates: {
      x: '10',
      y: '10'
    },
    content: {
      title: 'Title',
      description: 'Description'
    }
  };

  ngOnInit(): void {
    this.init(this.obj);
  }

  init(prop: any) { }
}

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [ HomeComponent ]
    });

    component = TestBed.inject(HomeComponent);
  });

  it('test 1', () => {
    const arr = ['0', '1'];
    expect(arr).toContain('1');
  });

  it('test 2', () => {
    const spy = spyOn(component, 'init');
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
      id: '1',
      content: jasmine.anything()
    }));

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
      id: '1',
      content: jasmine.objectContaining({ title: 'Title' })
    }));

    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({
      id: '1',
      content: jasmine.objectContaining({ title: 'Title' })
    }));

  });
});

@Component({ template: '' })
class TestComponent {
  title = 'Test Component title';
}

describe('TestComponent', () => {
  let component: TestComponent;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [ TestComponent ]
    });

    component = TestBed.inject(TestComponent);
  });

  it('test 1', () => {
    expect(component.title).toBe('Test Component title');
  });
});
