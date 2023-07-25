import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { filter, mapTo, merge } from 'rxjs';

@Component({
  selector: 'app-users-resolver',
  styles: [],
  template: `
    <ng-container *ngIf="users$ | async as users">
      <app-user-spinner *ngIf="isRunning$ | async"></app-user-spinner>
      <div *ngFor="let user of users">
        <span>Name: {{user.name}}</span>
        <a [routerLink]="['/users', user.id]">Details</a>
      </div>
    </ng-container>
  `
})
export class UsersResolverComponent {
  readonly users$ = this.usersService.fetchUsers();
  readonly resolveEventsStarts$ = this.router.events.pipe(
    filter(event => event instanceof ResolveStart),
    mapTo(true)
  );
  readonly resolveEventsEnds$ = this.router.events.pipe(
    filter(event => event instanceof ResolveEnd),
    mapTo(false)
  );
  readonly isRunning$ = merge(this.resolveEventsStarts$, this.resolveEventsEnds$);

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }
}

