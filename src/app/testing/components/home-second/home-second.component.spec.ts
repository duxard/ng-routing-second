import { HomeSecondComponent } from './home-second.component';
import { HomeService } from './home.service';
import { provideAutoSpy, Spy } from 'jasmine-auto-spies';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let componentUnderTest: HomeSecondComponent;
  let HomeServiceSpy: Spy<HomeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeSecondComponent,
        provideAutoSpy(HomeService, {
          observablePropsToSpyOn: ['users$'],
          gettersToSpyOn: ['users2$'],
          settersToSpyOn: ['usersSetter'],
          // "methodsToSpyOn" is redundant:
          // methodsToSpyOn: ['getUsers']
        })
      ],
    });

    componentUnderTest = TestBed.inject(HomeSecondComponent);
    HomeServiceSpy = TestBed.inject<any>(HomeService);
  });

  it('check setter - settersToSpyOn', () => {
    HomeServiceSpy.usersSetter = [];
    expect(HomeServiceSpy.accessorSpies.setters.usersSetter).toHaveBeenCalled();
  });

  it('check prop - observablePropsToSpyOn', () => {
    const data: string[] = [];
    HomeServiceSpy.users$.nextWith(data);
    componentUnderTest.subscribeToUsers();
    expect(componentUnderTest.data).toEqual(data as any)
  });

  it('check getter - gettersToSpyOn', () => {
    HomeServiceSpy.accessorSpies.getters.users2$.and.returnValue(of([]));
    componentUnderTest.subscribeToUsers2();
    expect(HomeServiceSpy.accessorSpies.getters.users2$).toHaveBeenCalled();
  });

  it('check method', () => {
    const users = ['test user'];
    HomeServiceSpy.getUsers.and.nextWith(users);

    componentUnderTest.ngOnInit();
    expect(HomeServiceSpy.getUsers).toHaveBeenCalled();
  });

  it('INIT', () => {
    const users = ['test user'];
    const methodSpy = spyOn(componentUnderTest, 'multiplyByTen');

    HomeServiceSpy.getUsers.and.nextWith(users);
    methodSpy.and.callThrough();
    componentUnderTest.ngOnInit();

    expect(componentUnderTest.counter).toBe(1);
    expect(componentUnderTest.users).toBe(users);
    componentUnderTest.data$$.subscribe(data => {
      expect(data).toEqual(users);
    });
    expect(methodSpy).toHaveBeenCalledWith(10);
    expect(componentUnderTest.result).toBe(100);
  });
});
