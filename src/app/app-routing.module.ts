import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EagerComponent } from './components/eager/eager.component';
import { StandaloneComponent } from './components/standalone/standalone.component';
import { UsersResolverComponent } from './components/users-resolver/users-resolver.component';
import { UserDetailsComponent } from './components/users-resolver/user-details/user-details.component';
import { UserResolver } from './components/users-resolver/resolvers/user.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: EagerComponent },
  { path: 'lazy', loadChildren: () => import('./components/lazy/lazy.module').then(m => m.LazyModule) },
  { path: 'standalone', component: StandaloneComponent },
  { path: 'users', component: UsersResolverComponent },
  { path: 'users/:id', component: UserDetailsComponent, resolve: {user: UserResolver} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
