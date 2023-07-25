import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-details',
  styles: [],
  template: `
    <div *ngIf="user$ | async as user; else loadingTpl">
      <div>Name: {{user.name}}</div>
      <div>Email: {{user.email}}</div>
      <div>Phone: {{user.phone}}</div>
    </div>
    <button (click)="onClick()">Back</button>
    
    <ng-template #loadingTpl>
      <span>Loading...</span>
    </ng-template>
  `
})
export class UserDetailsComponent {
  readonly user$ = this.route.data.pipe(
    map(data => data.user)
  );

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  onClick(): void {
    this.router.navigate(['/users']);
  }
}
