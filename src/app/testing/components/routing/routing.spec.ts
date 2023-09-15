import { AppComponent } from '../../../app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { FormComponent } from '../form/form.component';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

/*

  home component:
  <a [routerLink]="['/form']";

 */

describe('routing', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HomeComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'form', component: FormComponent },
      ])],
      providers: []
    })
      .compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(location.path()).toEqual('/home');
  });

  it('should be created 1', async() => {
    const formLink = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    console.log(formLink[0]);
    formLink[0].nativeElement.click();

    await fixture.whenStable();
    expect(location.path()).toEqual('/form');
  });

  it('should be created 2', async () => {
    const btn =  fixture.debugElement.query(By.css('#formBtn'));
    btn.nativeElement.click();
    await fixture.whenStable();
    expect(location.path()).toEqual('/form');
  });

});
